import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLogin = () => {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            axios
                .get(`http://localhost:8000/oauth/callback/kakao/?code=${code}`)
                .then((response) => {
                    // 로그인 성공 후 처리할 로직을 여기에 추가
                    console.log('Login Success:', response.data);
                    // 예: 토큰 저장, 사용자 정보 설정 등
                })
                .catch((error) => {
                    console.error('Login Error:', error);
                });
        }
    }, []);

    return (
        <div>
            <h2>Kakao Login</h2>
            <p>로그인 중입니다...</p>
        </div>
    );
};

export default KakaoLogin;
