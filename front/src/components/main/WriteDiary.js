import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WriteDiary = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');

    const handleSaveDiary = () => {
        // 일기 저장 로직
        navigate('/main');
    };

    return (
        <div className="write-diary-container">
            <h2>일기 작성</h2>
            <input type="file" accept="image/*" />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="텍스트를 입력하세요"
            ></textarea>
            <button onClick={handleSaveDiary}>저장</button>
        </div>
    );
};

export default WriteDiary;