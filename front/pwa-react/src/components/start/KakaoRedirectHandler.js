import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const fetched = useRef(false);

    useEffect(() => {
        const handleCallback = async () => {
            if (fetched.current) return;
            fetched.current = true;
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (!code) {
                console.error('Authorization code is missing');
                navigate('/error'); // Authorization code가 없을 경우 에러 페이지로 이동
                return;
            }

            try {
                const response = await axios.get('http://13.125.0.218:8000/kakao/login/callback/', {
                    params: { code }
                });

                console.log('Kakao login response:', response.data);

                const { access, refresh, isFirstLogin } = response.data;

                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);

                // Cookies.set('authaccess', access, { expires: 7 });
                // Cookies.set('authrefresh', refresh, { expires: 7 });

                // 최초 로그인 여부에 따라 페이지 이동
                if (isFirstLogin) {
                    navigate('/settings'); // 최초 로그인일 경우 Settings 페이지로 이동

                } else {
                    navigate('/main'); // 기본 페이지로 이동
                }
            } catch (error) {
                console.error('Error handling Kakao callback:', error);
                navigate('/error'); // 에러 발생 시 에러 페이지로 이동
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default KakaoRedirectHandler;
