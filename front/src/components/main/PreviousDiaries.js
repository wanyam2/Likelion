import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousDiaries = () => {
    const navigate = useNavigate();

    return (
        <div className="previous-diaries-container">
            <h2>이전 일기</h2>
            <button onClick={() => navigate('/main')}>현재 일기로 돌아가기</button>
            {/* 달력 및 저장된 일기 표시 로직 */}
        </div>
    );
};

export default PreviousDiaries;