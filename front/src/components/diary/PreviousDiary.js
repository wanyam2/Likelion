// PreviousDiary.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PreviousDiary.css'; // Import your CSS file for styling

const PreviousDiary = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get('/api/diary/entries'); // 실제 API 엔드포인트로 수정
                setEntries(response.data);
            } catch (error) {
                console.error('Failed to fetch diary entries:', error);
            }
        };

        fetchEntries();
    }, []);

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

export default PreviousDiary;
