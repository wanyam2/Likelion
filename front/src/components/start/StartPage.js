import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css'; // 스타일을 위한 css 파일

const StartPage = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Google 로그인 로직
        navigate('/login');
    };

    const handleKakaoLogin = () => {
        // Kakao 로그인 로직
        navigate('/login');
    };

    const handleNaverLogin = () => {
        // Naver 로그인 로직
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="start-container">
            <h1>갓생일기</h1>
            <button onClick={handleSignUp}>ID, password 회원가입</button>
            <button onClick={handleGoogleLogin}>Google로 로그인</button>
            <button onClick={handleKakaoLogin}>Kakao로 로그인</button>
            <button onClick={handleNaverLogin}>Naver로 로그인</button>
        </div>
    );
};

export default StartPage;
