# Likelion backend

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

6.setting.py 에서 INSTALLED_APPS에 'backend', 'rest_framework' 넣기

7. 마이그레이션
```
python manage.py makemigrations
```
```
python manage.py migrate
```

8. runserver
```
python manage.py runserver
```