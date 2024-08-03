import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                navigate('/error');
                return;
            }

            try {
                const response = await axios.get(`http://15.164.76.9:8000/kakao/login/callback/`, {
                    params: { code }
                });

                console.log('Kakao login response:', response.data);

                const { redirect_url } = response.data;
                if (redirect_url) {
                    navigate(redirect_url); // RegisterPage로 이동
                } else {
                    navigate('/home'); // 기본 페이지로 이동
                }
            } catch (error) {
                console.error('Error handling Kakao callback:', error);
                navigate('/error'); // 에러 페이지로 이동
            }
        };

        handleCallback();
    }, []);

    return <div>Loading...</div>;
};

export default KakaoRedirectHandler;
