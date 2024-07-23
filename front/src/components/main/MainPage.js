import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // CSS 파일을 import

const MainPage = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/more');
    };

    return (
        <div className="main-container">
            <header className="header">
                <div className="header-text">갓생일기</div>
                <img
                    className="header-logo"
                    width="39"
                    height="20"
                    src="/Vector10_71.png"
                    alt="Menu"
                    onClick={handleLogoClick}
                />
            </header>

            <div className="greeting-box">
                <div className="greeting-text">
                    <span className="greeting-highlight">안녕하세요. </span>
                    <span className="greeting-name">(이름)</span>
                    <span className="greeting-highlight">님.<br />오늘은 좋은 하루 되셨나요?</span>
                </div>
            </div>

            <div className="diary-sections">
                <div className="diary-section" onClick={() => navigate('/diary')}>오늘의 일기</div>
                <div className="diary-section" onClick={() => navigate('/yesterday-diary')}>어제의 일기</div>
                <div className="diary-section" onClick={() => navigate('/storage')}>일기 저장소</div>
                <div className="diary-section" onClick={() => navigate('/eye-protection')}>눈 보호모드</div>
                <div className="diary-section" onClick={() => navigate('/usage')}>내 사용량</div>
            </div>
        </div>
    );
};

export default MainPage;
