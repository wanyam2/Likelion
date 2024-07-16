import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleWriteDiary = () => {
        navigate('/write-diary');
    };

    const handlePreviousDiaries = () => {
        navigate('/previous-diaries');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    return (
        <div className="main-container">
            <h2>현재 일기</h2>
            <button onClick={handleWriteDiary}>+ 일기 작성</button>
            <button onClick={handlePreviousDiaries}>이전 일기</button>
            <button onClick={handleSettings}>설정</button>
        </div>
    );
};

export default MainPage;