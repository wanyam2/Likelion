import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css'; // 스타일을 위한 css 파일

const StartPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // 회원가입 로직
        console.log("회원가입:", id, password);
        navigate('/login');
    };

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

    return (
        <div className="start-container">
            <h1>갓생일기</h1>
            <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>회원가입</button>
            <hr />
            <button onClick={handleGoogleLogin}>Google로 로그인</button>
            <button onClick={handleKakaoLogin}>Kakao로 로그인</button>
            <button onClick={handleNaverLogin}>Naver로 로그인</button>
        </div>
    );
};

export default StartPage;
