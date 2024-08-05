import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import './CheckDiary.css'; // Import the CSS file

const CheckDiary = () => {
    const { state } = useLocation(); // Get the state from the location
    const navigate = useNavigate(); // Hook for navigation

    const handleButtonClick = () => {
        navigate('/diary'); // Navigate to the DiaryPage
    };

    // Display a message if no date is passed
    if (!state || !state.date) {
        return <div className="diary-content">날짜를 선택해 주세요.</div>;
    }

    const entryDate = new Date(state.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="diary-container">
            <header className="diary-header">
                <div className="diary-header-background"></div>
                <div className="diary-header-title">갓생일기</div>
            </header>
            <main className="diary-content">
                <div className="diary-title">오늘의 일기</div>
                <div className="diary-oval"></div> {/* Oval shape */}
                <div className="diary-message">
                    <span className="diary-message-title">오늘의 일기가 왔어요<br/></span>
                    <span className="diary-message-subtitle">나의 하루를 보러갈까요?</span>
                </div>
                <div className="diary-button-area">
                    <button onClick={handleButtonClick} className="diary-button">
                        일기 확인하러가기
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CheckDiary;
