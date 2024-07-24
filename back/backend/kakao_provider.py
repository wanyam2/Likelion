import requests
from django.conf import settings
from rest_framework.exceptions import APIException


token_url = "https://kauth.kakao.com/oauth/token"
login_url = "https://kapi.kakao.com/v2/user/me"
redirect_uri = "http://localhost:3000/kakao/callback"  # 여기에 실제 리다이렉트 URI를 넣으세요


class KakaoTokenException(APIException):
    status_code = 500
    default_detail = "카카오 토큰이 없습니다."
    default_code = "kakao_token_missing"


class KakaFailException(APIException):
    status_code = 500
    default_detail = "카카오 인증이 실패하였습니다"
    default_code = "kakao_token_missing"


class KakaoProvider:
    def __init__(self, auth_code: str):
        self.auth_code = auth_code
        self.access_token = None

    def get_token(self) -> str:
        rest_key = settings.KAKAO_REST_API_KEY
        url = f"{token_url}?grant_type=authorization_code&client_id={rest_key}&code={self.auth_code}&redirect_uri={redirect_uri}"
        print(f'url {url}')
        token_details = requests.get(url).json()

        print(f"token_details: {token_details}")
        error = token_details.get("error", None)
        print(f'error: {error}')
        if error is not None:
            raise KakaFailException()

        access_token: str = token_details.get("access_token")
        self.access_token = access_token
        return access_token

    def login(self):
        if not self.access_token:
            raise KakaoTokenException()
        kakao_authorized = requests.post(
            login_url, headers={"Authorization": f"Bearer {self.access_token}"}
        ).json()

        kakao_user_id = kakao_authorized["id"]
        return kakao_user_id