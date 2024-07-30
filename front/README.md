## REACT 실행 방법

https://velog.io/@mumukim/react-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95

Node 설치 이후에 프로젝트 터미널 창에서 npm start 하시면 됩니다

! 만약 에러 발생 시, npm install 이후에 다시 npm start 하시면 됩니다
<br/>
! localhost 창 열리면 성공입니다! 만약 localhost 창에서 빨간 오류 뜨면 연락해주세요

## 각 컴포넌트 설명
src > components > auth > KakaoLogin.js : 카카오 로그인에 관한 기능

src > components > diary > CheckDiary.js : 오늘 하루 일기에 관해 확인
src > components > diary > DiaryPage.js : 일기 본문 작성 페이지
src > components > diary > Storage.js : 과거 일기 확인 

src > components > main > MainPage.js : 기본 화면
src > components > main > MoreMenu.js : 더보기란
src > components > main > RegisterPage.js : 최초 등록 시 페이지
src > components > main > SettingPage.js : 개인 설정 페이지

src > components > start > KakaoLoginButton.js : 카카오 로그인에 관한 동작 수행
src > components > start > KakaoRedirectHandler.js : 카카오 로그인 이후에 관한 동작 수행
src > components > start > StartPage.js : 앱 실행화면 및 로그인