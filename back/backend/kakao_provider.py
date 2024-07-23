import requests
from django.conf import settings
from .exceptions import AppError

token_url = "https://kauth.kakao.com/oauth/token"
login_url = "https://kapi.kakao.com/v2/user/me"
redirect_uri = "https://localhost:3000"  # 여기에 실제 리다이렉트 URI를 넣으세요

class KakaoProvider:
    def __init__(self, auth_code: str):
        self.auth_code = auth_code
        self.access_token = None

    def get_token(self) -> str:
        rest_key = settings.KAKAO_REST_API_KEY
        url = f"{token_url}?grant_type=authorization_code&client_id={rest_key}&code={self.auth_code}&redirect_uri={redirect_uri}"
        token_details = requests.get(url).json()

        error = token_details.get("error", None)
        if error is not None:
            raise AppError(code=500, detail="카카오 인증에 실패하였습니다")

        access_token: str = token_details.get("access_token")
        self.access_token = access_token
        return access_token

    def login(self):
        if not self.access_token:
            raise AppError(code=500, detail="인증 토큰이 존재하지 않습니다")
        kakao_authorized = requests.post(
            login_url, headers={"Authorization": f"Bearer {self.access_token}"}
        ).json()

        kakao_user_id = kakao_authorized["id"]
        return kakao_user_id