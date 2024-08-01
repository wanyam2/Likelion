import axios from 'axios';
import React from 'react';

const KakaoLoginButton = () => {
    const handleLogin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/kakao/auth/url/');
            const kakaoRedirectUri = response.data;
            console.log('Kakao login button clicked');
            console.log('Kakao Auth URL:', kakaoRedirectUri); // 로그를 통해 URL 확인
            window.location.href = kakaoRedirectUri;
        } catch (error) {
            console.error('Error fetching Kakao auth URL:', error);
            if (error.response) {
                // 서버에서 응답이 있지만 오류가 발생한 경우
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // 요청이 이루어졌지만 응답이 없는 경우
                console.error('Request data:', error.request);
            } else {
                // 설정 중에 발생한 오류
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="login-option kakao" onClick={handleLogin}>
            <span className="icon">K</span>
            <span className="text">카카오 로그인</span>
        </div>
    );
};

export default KakaoLoginButton;
