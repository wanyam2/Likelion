import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    // 백엔드 API 호출하여 토큰을 가져옵니다
                    const response = await axios.post('/api/kakao/login/', { code });

                    // 로그인 성공 후 페이지 리디렉션
                    if (response.data.is_first_login) {
                        navigate('/register');
                    } else {
                        navigate('/main');
                    }
                } catch (error) {
                    console.error('Kakao login failed:', error);
                }
            } else {
                navigate('/');
            }
        };

        fetchToken();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default KakaoRedirectHandler;
