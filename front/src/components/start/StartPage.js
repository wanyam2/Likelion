import React from 'react';
import KakaoLoginButton from './KakaoLoginButton'; // KakaoLoginButton 컴포넌트를 import
import './StartPage.css';

const StartPage = () => {
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
                    <div className="login-option google">
                        <span className="icon">G</span>
                        <span className="text">구글 로그인</span>
                    </div>
                    <KakaoLoginButton /> {/* KakaoLoginButton 컴포넌트를 사용 */}
                    <div className="login-option naver">
                        <span className="icon">N</span>
                        <span className="text">네이버 로그인</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
