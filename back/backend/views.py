import jwt
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, Request
from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)

from .kakao_provider import KakaoProvider
from .models import Diary, User
from .serializers import (
    UserSerializer,
    RegisterUserSerializer,
    DiarySerializer,
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


class DiaryAPIView(APIView):
    def get(self, request):
        userid = request.query_params.get("userid")
        date = request.query_params.get("date")

        if not userid:
            return Response(
                {"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        if date:
            try:
                diary = Diary.objects.get(userid=userid, date=date)
            except Diary.DoesNotExist:
                return Response(
                    {"error": "Diary not found for the given date"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            diaries = Diary.objects.filter(userid=userid)
            if not diaries.exists():
                return Response(
                    {"error": "No diaries found for the given user"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = DiarySerializer(diaries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DiarySerializer(data=request.data)
        if serializer.is_valid():
            diary = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        userid = request.query_params.get("userid")

        if not userid:
            return Response(
                {"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            date = datetime.now().date()
            diary = Diary.objects.get(userid=userid, date=date)
        except Diary.DoesNotExist:
            return Response(
                {"error": "Diary not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DiarySerializer(diary, data=request.data)
        if serializer.is_valid():
            diary = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def main(request):
    message = request.GET.get("키값")
    print(message)  # 메세지 확인

    return HttpResponse("응답 값")
