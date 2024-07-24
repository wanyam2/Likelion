"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

from backend.views import AuthAPIView, RegisterAPIView, DiaryAPIView, KakaoLogin, KakaoPublishURI  

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/login/", AuthAPIView.as_view(), name="login"),
    path("auth/register/", RegisterAPIView.as_view(), name="register"),
    path("diary/", DiaryAPIView.as_view(), name="diary"),
    path("kakao/login/callback/", KakaoLogin.as_view(), name="kakao_login"),
    path("kakao/auth/url/", KakaoPublishURI.as_view()),
    path('accounts/', include('allauth.urls')),
    # path('accounts/', include('accounts.urls')),
    path("", include("backend.urls")),  # 'backend' 앱의 URL을 포함,
]
