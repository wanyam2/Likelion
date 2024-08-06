import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // CSS 파일을 import

const MainPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(''); // 사용자 이름 상태

    useEffect(() => {
        // 사용자 정보를 가져오는 함수
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://13.125.0.218:8000/api/auth/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // 쿠키 포함 요청
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.first_name); // 사용자 이름 상태 업데이트
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogoClick = () => {
        navigate('/more');
    };

    return (
        <div className="main-container">
            <header className="header">
                <div className="header-text">갓생일기</div>
                <div
                    className="header-logo"
                    onClick={handleLogoClick}
                >
                    <div className="burger-icon"></div>
                    <div className="burger-icon"></div>
                    <div className="burger-icon"></div>
                </div>
            </header>

            <div className="greeting-box">
                <div className="greeting-text">
                    <span className="greeting-highlight">안녕하세요. </span>
                    <span className="greeting-name">{userName}</span>
                    <span className="greeting-highlight">님.<br />오늘은 좋은 하루 되셨나요?</span>
                </div>
            </div>

            <div className="diary-sections">
                <div className="diary-section" onClick={() => navigate('/diary')}>오늘의 일기</div>
                <div className="diary-section" onClick={() => navigate('/storage')}>일기 저장소</div>
                <div className="diary-section" onClick={() => navigate('/usage')}>내 사용량</div>
            </div>
        </div>
    );
};

export default MainPage;
