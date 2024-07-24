import React, { useState } from 'react';
import './DiaryPage.css'; // CSS 파일을 별도로 관리합니다.

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const DiaryPage = () => {
    const [text, setText] = useState(''); // 현재 입력된 글
    const [image, setImage] = useState(null); // 현재 입력된 이미지
    const [savedEntries, setSavedEntries] = useState([]); // 저장된 글과 이미지 목록

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = () => {
        if (text.trim() || image) {
            setSavedEntries([...savedEntries, { text, image, date: new Date() }]);
            setText(''); // 텍스트를 비웁니다.
            setImage(null); // 이미지를 비웁니다.
        }
    };

    const handleSubmit = () => {
        // 제출 시 처리 로직을 여기에 작성합니다.
        if (text.trim() || image) {
            const newEntry = { text, image, date: new Date() };
            setSavedEntries([...savedEntries, newEntry]);
            setText(''); // 텍스트를 비웁니다.
            setImage(null); // 이미지를 비웁니다.
            alert('제출되었습니다!');
        }
    };

    const now = new Date();
    const formattedDate = formatDate(now);

    return (
        <div className="diary-container">
            <header className="diary-header">오늘의 일기</header>
            <div className="diary-content">
                <div className="diary-date">{formattedDate}</div>
                <div className="diary-entry">
                    {image && <img className="diary-image" src={image} alt="Diary" />}
                    <textarea
                        className="diary-textarea"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="여기에 글을 작성하세요..."
                    />
                </div>
                <div className="diary-actions">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="diary-file-input" />
                    <button onClick={handleSave} className="diary-save-button">임시 저장</button>
                    <button onClick={handleSubmit} className="diary-submit-button">제출</button>
                </div>
                <div className="diary-saved-entries">
                    {savedEntries.length > 0 ? (
                        savedEntries.map((entry, index) => (
                            <div key={index} className="diary-saved-entry">
                                {entry.image && <img className="diary-saved-image" src={entry.image} alt="Saved Diary" />}
                                <p className="diary-saved-text">{entry.text}</p>
                                <p className="diary-saved-date">{formatDate(entry.date)}</p>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
            <div className="diary-bottom">
                <div className="diary-bottom-text">
                    오늘의 나는 어떠했나요?
                </div>
            </div>
        </div>
    );
};

export default DiaryPage;
