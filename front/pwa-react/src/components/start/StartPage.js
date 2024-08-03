import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅
import KakaoLoginButton from './KakaoLoginButton'; // KakaoLoginButton 컴포넌트를 import
import './StartPage.css';
import axios from 'axios';

const StartPage = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

    const handleClick = (loginType) => {
        axios
            .get('http://15.164.76.9:8000/login', {
                params: { type: loginType }
            })
            .then(response => {
                console.log(response.data);
                // 로그인 응답 데이터 처리
                if (loginType === 'kakao') {
                    if (response.data.is_first_login) {
                        navigate('/register'); // 최초 로그인일 경우 RegisterPage로 이동
                    } else {
                        navigate('/main'); // 그렇지 않으면 HomePage로 이동
                    }
                }
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
                    {/* <div className="login-option google" onClick={() => handleClick('google')}>
                        <span className="icon">G</span>
                        <span className="text">구글 로그인</span>
                    </div> */}
                    <KakaoLoginButton /> {/* KakaoLoginButton 컴포넌트를 사용 */}
                    {/* <div className="login-option naver" onClick={() => handleClick('naver')}>
                        <span className="icon">N</span>
                        <span className="text">네이버 로그인</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default StartPage;
