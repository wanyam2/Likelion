import React, { useState } from 'react';
import KakaoLoginButton from './KakaoLoginButton'; // KakaoLoginButton 컴포넌트를 import
import './StartPage.css';
import axios from 'axios';

const StartPage = () => {
    const [text, setText] = useState('없음');

    const clicked = () => {
        axios
            .get("http://15.164.76.9:8000/")
            .then((response) => setText(JSON.stringify(response.data)));
    };

    return (
        <div className="startpage-container">
            <div className="startpage-content">
                <div className="title">
                    <div>갓</div>
                    <div>생</div>
                    <div>일</div>
                    <div>기</div>
                </div>
                <div className="login-options">
                    <div className="login-option google" onClick={clicked}>
                        <span className="icon">G</span>
                        <span className="text">구글 로그인</span>
                    </div>
                    <KakaoLoginButton /> {/* KakaoLoginButton 컴포넌트를 사용 */}
                    <div className="login-option naver" onClick={clicked}>
                        <span className="icon">N</span>
                        <span className="text">네이버 로그인</span>
                    </div>
                </div>
            </div>
            <h1>{text}</h1>
        </div>
    );
};

export default StartPage;
