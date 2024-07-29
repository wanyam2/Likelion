import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            console.log('Received code:', code);

            if (code) {
                try {
                    // 백엔드 API 호출하여 카카오 로그인 처리
                    const response = await axios.get(`http://localhost:8000/kakao/login/callback/?code=${code}`);

                    // 디버깅: 응답 데이터 출력
                    console.log('Kakao login response:', response.data);

                    // 로그인 성공 후 페이지 리디렉션
                    if (response.data.is_first_login) {
                        navigate('/register');
                    } else {
                        navigate('/main');
                    }
                } catch (error) {
                    console.error('Kakao login failed:', error);
                    navigate('/');
                }
            } else {
                console.log('No code found in URL');
                navigate('/');
            }
        };

        fetchToken();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default KakaoRedirectHandler;