import React from 'react';
import './DiaryPage.css';  // 오늘의일기의 CSS를 별도로 관리합니다.

const DiaryPage = () => {
    return (
        <div className="diary-container">
            <header className="diary-header">오늘의 일기</header>
            <div className="diary-content">
                <div className="diary-date">20XX년 X월 X일 X요일</div>
                <div className="diary-text">오늘의 나는 어떠했나요?</div>
                <img className="diary-image" src="image 110_267.png" alt="Diary" />
            </div>
        </div>
    );
};

export default DiaryPage;
