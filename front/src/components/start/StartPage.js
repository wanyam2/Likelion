import React from 'react';
import KakaoLoginButton from './KakaoLoginButton'; // KakaoLoginButton 컴포넌트를 import
import './StartPage.css';
import axios from 'axios';

const StartPage = () => {
    const handleClick = (loginType) => {
        axios
            .get('http://15.164.76.9:8000/login', {
                params: { type: loginType }
            })
            .then(response => {
                console.log(response.data);
                // 여기서 원하는 동작을 수행할 수 있습니다.
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
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
                    <div className="login-option google" onClick={() => handleClick('google')}>
                        <span className="icon">G</span>
                        <span className="text">구글 로그인</span>
                    </div>
                    <KakaoLoginButton onClick={() => handleClick('kakao')} /> {/* KakaoLoginButton 컴포넌트를 사용 */}
                    <div className="login-option naver" onClick={() => handleClick('naver')}>
                        <span className="icon">N</span>
                        <span className="text">네이버 로그인</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
