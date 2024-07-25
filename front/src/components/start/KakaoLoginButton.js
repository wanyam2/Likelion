import React from 'react';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
    const handleLogin = () => {
        console.log('Kakao login button clicked');
        console.log('Kakao Auth URL:', KAKAO_AUTH_URL); // 로그를 통해 URL 확인
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <div className="login-option kakao" onClick={handleLogin}>
            <span className="icon">K</span>
            <span className="text">카카오 로그인</span>
        </div>
    );
};

export default KakaoLoginButton;
