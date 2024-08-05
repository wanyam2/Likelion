import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅

const KakaoLoginButton = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://15.164.76.9:8000/kakao/auth/url/');
            const kakaoRedirectUri = response.data;
            console.log('Kakao login button clicked');
            console.log('Kakao Auth URL:', kakaoRedirectUri); // 로그를 통해 URL 확인

            // 카카오 로그인 페이지로 이동
            window.location.href = kakaoRedirectUri;
        } catch (error) {
            console.error('Error fetching Kakao auth URL:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="log" onClick={handleLogin}>
        <img src="/kakao.png" />
            {/* <span className="icon">K</span> */}
            {/* <span className="text">카카오 로그인</span> */}
        </div>
    );
};

export default KakaoLoginButton;
