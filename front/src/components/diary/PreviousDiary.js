import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import './PreviousDiary.css'; // Import your CSS file for styling

const PreviousDiary = ({ entries }) => {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const handleDateClick = (date) => {
        // Check if there's an entry for the selected date
        const selectedDate = entries.find(entry =>
            new Date(entry.date).toDateString() === new Date(date).toDateString()
        );

        if (selectedDate) {
            navigate('/check-diary', { state: { date: selectedDate.date } });
        }
    };

    const tileClassName = ({ date }) => {
        // Check if the current date is in the entries array
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
