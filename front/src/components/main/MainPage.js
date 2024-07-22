// MainPage.js
import React from 'react';
import './MainPage.css'; // CSS 파일을 import

const MainPage = () => {
    return (
        <div className="main-container">
            {/* Header */}
            <header className="header">
                <div className="header-text">갓생일기</div>
                <img
                    className="header-logo"
                    width="39"
                    height="20"
                    src="Vector10_71.png"
                    alt="Logo"
                />
            </header>

            {/* Diary Sections */}
            <div className="diary-section">오늘의 일기</div>
            <div className="diary-section">어제의 일기</div>
            <div className="diary-section">일기 저장소</div>
            <div className="diary-section">눈 보호모드</div>
            <div className="diary-section">내 사용량</div>

            {/* Greeting Box */}
            <div className="greeting-box">
                <div className="greeting-text">
                    <span className="greeting-highlight">안녕하세요. </span>
                    <span className="greeting-name">(이름)</span>
                    <span className="greeting-highlight">님.<br />오늘은 좋은 하루 되셨나요?</span>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
