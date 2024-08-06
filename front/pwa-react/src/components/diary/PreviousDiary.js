// PreviousDiary.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // react-calendar 라이브러리 사용
import axios from 'axios'; // axios import
import './PreviousDiary.css'; // CSS 파일 import

const PreviousDiary = () => {
    // 상태 변수 선언
    const [date, setDate] = useState(new Date());
    const [userID, setUserID] = useState(null); // userID 상태 추가
    const [diaryEntries, setDiaryEntries] = useState([]); // 일기 데이터 상태 추가

    // 사용자 ID를 가져오는 함수
    const fetchUserID = async () => {
        try {
            const response = await axios.get('/auth/login'); // 사용자 ID를 가져오는 API 호출
            setUserID(response.data.userID); // userID 상태 업데이트
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    // 사용자의 다이어리 데이터를 가져오는 함수
    const fetchDiaryEntries = async () => {
        if (userID) {
            try {
                const response = await axios.get(`/api/diary/${userID}`, {
                    params: { date: date.toISOString().split('T')[0] }, // 날짜를 문자열로 변환하여 쿼리 파라미터로 전달
                });
                setDiaryEntries(response.data.entries); // 다이어리 데이터 상태 업데이트
            } catch (error) {
                console.error('Error fetching diary entries:', error);
            }
        }
    };

    // 컴포넌트가 마운트되었을 때 사용자 ID를 가져옵니다.
    useEffect(() => {
        fetchUserID();
    }, []);

    // 날짜가 변경되었을 때 다이어리 데이터를 가져옵니다.
    useEffect(() => {
        fetchDiaryEntries();
    }, [date, userID]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        // 여기에 선택된 날짜에 따라 일기를 로드하는 로직 추가 가능
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className="arrow-button" onClick={() => handleDateChange(new Date(date.getFullYear(), date.getMonth() - 1))}>
                    &lt;
                </button>
                <div className="calendar-title">
                    {date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                </div>
                <button className="arrow-button" onClick={() => handleDateChange(new Date(date.getFullYear(), date.getMonth() + 1))}>
                    &gt;
                </button>
            </div>
            <Calendar
                className="react-calendar"
                value={date}
                onChange={handleDateChange}
            />
            {/* 다이어리 항목들을 화면에 표시 */}
            <div className="diary-entries">
                {diaryEntries.length > 0 ? (
                    <ul>
                        {diaryEntries.map((entry, index) => (
                            <li key={index}>{entry.content}</li> // 예를 들어, entry.content로 항목 표시
                        ))}
                    </ul>
                ) : (
                    <p>No diary entries available.</p>
                )}
            </div>
        </div>
    );
};

export default PreviousDiary;
