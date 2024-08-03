import jwt
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, Request
from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework.permissions import IsAuthenticated
from .kakao_provider import KakaoProvider
from .models import User, UserSetting, Diary, DiaryEntry
from .serializers import (
    UserSerializer,
    UserSettingSerializer,
    RegisterUserSerializer,
    DiarySerializer,
    DiaryEntrySerializer,
)
from config import settings
from datetime import datetime

default_auth_url = "https://kauth.kakao.com/oauth/authorize"
kakao_redirect_url = "http://localhost:3000/kakao/callback"


def get_kakao_auth_redirect_url():
    api_key = settings.KAKAO_REST_API_KEY
    return f"{default_auth_url}?client_id={api_key}&redirect_uri={kakao_redirect_url}&response_type=code"


class KakaoPublishURI(APIView):

    def get(self, req: Request):
        return Response(data=get_kakao_auth_redirect_url(), status=200)


class KakaoLogin(APIView):
    def get(self, request):
        auth_code = request.GET.get("code")
        print(f"auth_code: {auth_code}")
        if not auth_code:
            return Response(
                {"error": "Authorization code is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        kakao_provider = KakaoProvider(auth_code)
        access_token = kakao_provider.get_token()
        print(f"access_token: {access_token}")
        kakao_user_id = kakao_provider.login()

        user, created = User.objects.get_or_create(username=kakao_user_id)
        if created:
            user.set_unusable_password()
            user.save()
            # 회원가입 페이지로 리다이렉트
            return Response(
                {"access": None, "refresh": None, "is_first_login": True},
                status=status.HTTP_200_OK,
            )

        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)

        res = Response(
            {
                "access": access_token,
                "refresh": refresh_token,
                "is_first_login": False,
            },
            status=status.HTTP_200_OK,
        )
        res.set_cookie("access", access_token, httponly=True)
        res.set_cookie("refresh", refresh_token, httponly=True)
        return res


class AuthAPIView(APIView):
    # 유저 정보 확인
    def get(self, request):
        try:
            access = request.COOKIES["access"]
            payload = jwt.decode(access, settings.SECRET_KEY, algorithms=["HS256"])
            pk = payload.get("id")
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except jwt.exceptions.ExpiredSignatureError:
            # 토큰 만료시 갱신
            refresh_token = request.COOKIES.get("refresh", None)
            serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
            try:
                if serializer.is_valid(raise_exception=True):
                    access = serializer.validated_data.get("access", None)
                    refresh = serializer.validated_data.get("refresh", None)
                    payload = jwt.decode(access, SECRET_KEY, algorithms=["HS256"])
                    pk = payload.get("id")
                    user = get_object_or_404(User, pk=pk)
                    serializer = UserSerializer(instance=user)
                    res = Response(serializer.data, status=status.HTTP_200_OK)
                    res.set_cookie("access", access)
                    res.set_cookie("refresh", refresh)
                    return res
                raise jwt.exceptions.InvalidTokenError
            except (TokenBackendError, TokenError):
                return Response(
                    {"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED
                )
        except jwt.exceptions.InvalidTokenError:
            # 사용 불가능한 토큰
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )

        # 이미 회원가입 된 유저
        if user is not None:
            serializer = UserSerializer(user)
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            res.set_cookie("access", access_token)
            res.set_cookie("refresh", refresh_token)
            return res
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        response = Response(
            {"message": "Logout success"}, status=status.HTTP_202_ACCEPTED
        )
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "access": access_token,
                    "refresh": refresh_token,
                },
                status=status.HTTP_200_OK,
            )

            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSettingAPIView(APIView):
    def get(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            settings = UserSetting.objects.get(user=user)
        except UserSetting.DoesNotExist:
            return Response(
                {"detail": "설정을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSettingSerializer(settings)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSettingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            settings = UserSetting.objects.get(user=user)
        except UserSetting.DoesNotExist:
            return Response(
                {"detail": "설정을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSettingSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DiaryAPIView(APIView):

    def post(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.get(id=userid)
        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        today = datetime.now().date()
        diary, created = Diary.objects.get_or_create(user=user, date=today)

        if created:
            entry = DiaryEntry.objects.create(
                diary=diary,
                time=datetime.now().time().strftime("%H:%M:%S"),
                content="기상",  # 기본 내용
                image=None,
            )

            DiaryEntrySerializer(entry)

        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        date = request.query_params.get("date")
        if not date:
            return Response(
                {"detail": "날짜를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        diary = Diary.objects.filter(user=user, date=date).first()
        if not diary:
            return Response(
                {"detail": "오늘의 일기가 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        diary_entries = DiaryEntry.objects.filter(diary_id=diary.pk)
        if not diary_entries.exists():
            return Response(
                {"detail": "해당 날짜의 일기 항목이 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = DiaryEntrySerializer(diary_entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DiaryEntryAPIView(APIView):

    def post(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        date = request.query_params.get("date")
        if not date:
            return Response(
                {"detail": "날짜를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            diary = Diary.objects.get(user=user, date=date)
        except Diary.DoesNotExist:
            return Response(
                {"detail": "해당 날짜의 일기가 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        entry_data = {
            "diary": diary.id,
            "time": datetime.now().time().strftime("%H:%M:%S"),
            "content": request.data.get("content"),
        }

        image_file = request.FILES.get("image")
        if image_file:
            entry_data["image"] = image_file

        serializer = DiaryEntrySerializer(data=entry_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        userid = request.query_params.get("userid")
        date = request.query_params.get("date")
        time = request.query_params.get("time")

        if not userid:
            return Response(
                {"detail": "유저ID를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        if not date:
            return Response(
                {"detail": "날짜를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response(
                {"detail": "유저를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            diary = Diary.objects.get(user=user, date=date)
        except Diary.DoesNotExist:
            return Response(
                {"detail": "해당 날짜의 일기가 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if time:
            # 시간 필터링
            try:
                query_time = datetime.strptime(time, "%H:%M:%S").time()
            except ValueError:
                return Response(
                    {
                        "detail": "시간 형식이 올바르지 않습니다. HH:MM:SS 형식을 사용하세요."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            diary_entries = DiaryEntry.objects.filter(diary=diary, time=query_time)
        else:
            # 전체 일기 항목 가져오기
            diary_entries = DiaryEntry.objects.filter(diary=diary)

        if not diary_entries.exists():
            return Response(
                {"detail": "해당 날짜의 일기 항목이 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = DiaryEntrySerializer(diary_entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


def main(request):
    message = request.GET.get("키값")
    print(message)  # 메세지 확인

    return HttpResponse("응답 값")
