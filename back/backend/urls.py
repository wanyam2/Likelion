from django.urls import path
from .views import KakaoLogin, main

urlpatterns = [
    path("", main, name="main"),
]
