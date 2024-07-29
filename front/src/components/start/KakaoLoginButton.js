import axios from 'axios';
import React from 'react';

const KakaoLoginButton = () => {
    const handleLogin = async () => {
        const kakaoRedirectUri = await axios.get('http://localhost:8000/kakao/auth/url')
            .then(data => data.data);
        console.log('Kakao login button clicked');
        console.log('Kakao Auth URL:', kakaoRedirectUri); // 로그를 통해 URL 확인
        window.location.href = kakaoRedirectUri;
    };

    return (
        <div className="login-option kakao" onClick={handleLogin}>
            <span className="icon">K</span>
            <span className="text">카카오 로그인</span>
        </div>
    );
};

export default KakaoLoginButton;
