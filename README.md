# Likelion

## 노션 링크
https://www.notion.so/eunchaelee/4-e1456b3e795f462cb56f3a07e4c4e2af

## APIKEY는 따로 관리
1. apikey.py 생성
2. 아래 코드 작성 후 수정
```
def get_api_key(api_name):
    if(api_name == ''):
        return ''
    else:
        return ''
```
3. 사용법

라이브러리 추가
```
from ...apikey import get_api_key
```
함수 작성
```
apikey = get_api_key('')
```