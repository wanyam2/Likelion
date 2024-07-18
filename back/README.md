# Likelion backend
## 서버 실행 방법
1. 가상환경 활성화

window 
```
source venv/Scripts/activate
```
mac
```
source venv/bin/activate
```
2. 마이그레이션

window
```
python manage.py makemigrations
```
```
python manage.py migrate
```
mac
```
python3 manage.py makemigrations
```
```
python3 manage.py migrate
```
3. runserver

windows
```
python manage.py runserver
```
mac
```
python3 manage.py runserver
```
---
## git clone 이후 시작 방법
1. secrets.json을 Likelion/secrets.json이 되도록 위치시킴

2. 가상환경 생성

window
```
python -m venv venv
```
mac
```
python3 -m venv venv
```
3. 가상환경 활성화

window 
```
source venv/Scripts/activate
```
mac
```
source venv/bin/activate
```
4. django, djangorestframework, django-cors-headers 라이브러리 설치
```
pip install django
```
```
pip install djangorestframework
```
```
pip install django-cors-headers
```
5. 마이그레이션

window
```
python manage.py makemigrations
```
```
python manage.py migrate
```
mac
```
python3 manage.py makemigrations
```
```
python3 manage.py migrate
```
6. runserver

windows
```
python manage.py runserver
```
mac
```
python3 manage.py runserver
```
---
## django 초기설정 방법
1. 가상환경 생성

window
```
python -m venv venv
```
mac
```
python3 -m venv venv
```
2. 가상환경 활성화

window 
```
source venv/Scripts/activate
```
mac
```
source venv/bin/activate
```
3. 장고 설치
```
pip install django
```
4. 장고 레스트 프레임워크 설치
```
pip install djangorestframework
```
5. 장고 초기 설정
```
django-admin startproject config .
```
```
django-admin startapp backend
```

6. config/setting.py의 INSTALLED_APPS에 아래 코드 추가
```
'backend',
'rest_framework',
```
7. 마이그레이션

window
```
python manage.py makemigrations
```
```
python manage.py migrate
```
mac
```
python3 manage.py makemigrations
```
```
python3 manage.py migrate
```
8. runserver

windows
```
python manage.py runserver
```
mac
```
python3 manage.py runserver
```

## react 연동
1. 라이브러리 설치
```
pip install django-cors-headers
```
2. config/setting.py의 INSTALL_APP에 아래 코드 추가
```
'corsheaders',
```
3. config/urls.py의 urlpatterns = []에 아래 코드 추가
from django.urls import path, *include* 라이브러리 추가해야 함
```
path('', include('backend.urls')),
```
4. backend/urls.py 생성 후 아래 코드 추가
```
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.main),
]
```
5. backend/views.py에 아래 코드 추가
```
from django.http import HttpResponse


def main(request):
    message = request.GET.get('키값')
    print(message) # 메세지 확인

    return HttpResponse(응닶 값)

```