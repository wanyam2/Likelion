import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Storage.css'; // Import your CSS file for styling

const Storage = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // 저장된 사용자 ID를 로드

    useEffect(() => {
        const fetchEntries = async () => {
            if (!userId) return; // 사용자 ID가 없으면 요청하지 않음

            try {
                const response = await axios.get('/api/diary/entries', {
                    params: { userId } // 사용자 ID를 쿼리 파라미터로 전송
                });
                setEntries(response.data.entries); // 응답에서 일기 항목들을 추출
            } catch (error) {
                console.error('Failed to fetch diary entries:', error);
            }
        };

        fetchEntries();
    }, [userId]); // userId가 변경될 때마다 재호출

    const handleDateClick = (date) => {
        const selectedDate = entries.find(entry =>
            new Date(entry.date).toDateString() === new Date(date).toDateString()
        );

        if (selectedDate) {
            navigate('/check-diary', { state: { date: selectedDate.date } });
        }
    };

    const tileClassName = ({ date }) => {
        const isEntryDate = entries.some(entry =>
            new Date(entry.date).toDateString() === new Date(date).toDateString()
        );
        return isEntryDate ? 'highlighted' : null;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className="arrow-button" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>
                    &lt;
                </button>
                <span className="calendar-title">
                    {date.toLocaleDateString('default', { year: 'numeric', month: 'long' })}
                </span>
                <button className="arrow-button" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>
                    &gt;
                </button>
            </div>
            <Calendar
                onClickDay={handleDateClick}
                value={date}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default Storage;
