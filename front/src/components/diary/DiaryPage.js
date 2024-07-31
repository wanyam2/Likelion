import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryPage.css'; // CSS 파일을 별도로 관리합니다.

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const DiaryPage = () => {
    const navigate = useNavigate();
    const [text, setText] = useState(''); // 현재 입력된 글
    const [media, setMedia] = useState(null); // 현재 입력된 이미지 또는 비디오
    const [savedEntries, setSavedEntries] = useState([]); // 저장된 글과 미디어 목록
    const [isChanged, setIsChanged] = useState(false); // 변경 여부 확인

    const handleTextChange = (e) => {
        setText(e.target.value);
        setIsChanged(true);
    };

    const handleMediaChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setMedia(URL.createObjectURL(file));
            setIsChanged(true);
        }
    };

    const handleSave = () => {
        if (text.trim() || media) {
            setSavedEntries([...savedEntries, { text, media, date: new Date() }]);
            setText(''); // 텍스트를 비웁니다.
            setMedia(null); // 미디어를 비웁니다.
            setIsChanged(false); // 변경 사항 초기화
        }
    };

    const handleSubmit = () => {
        if (text.trim() || media) {
            const newEntry = { text, media, date: new Date() };
            setSavedEntries([...savedEntries, newEntry]);
            setText(''); // 텍스트를 비웁니다.
            setMedia(null); // 미디어를 비웁니다.
            setIsChanged(false); // 변경 사항 초기화
            alert('제출되었습니다!');
        }
    };

    const handleBack = () => {
        if (isChanged) {
            if (window.confirm('변경 사항이 있습니다. 저장하시겠습니까?')) {
                handleSave();
                navigate('/main'); // 변경 사항 저장 후 메인 페이지로 이동
            } else if (window.confirm('저장하지 않고 이동하시겠습니까?')) {
                navigate('/main'); // 변경 사항 저장하지 않고 메인 페이지로 이동
            } else {
                // 취소 버튼을 눌렀을 때 아무 동작도 하지 않음
            }
        } else {
            navigate('/main'); // 변경 사항이 없을 때 바로 메인 페이지로 이동
        }
    };

    const now = new Date();
    const formattedDate = formatDate(now);

    return (
        <div className="diary-container">
            <header className="diary-header">
                오늘의 일기
                <button onClick={handleBack} className="diary-back-button">🏠</button>
            </header>
            <div className="diary-content">
                <div className="diary-date">{formattedDate}</div>
                <div className="diary-entry">
                    {media && (
                        <div className="diary-media-wrapper">
                            {media.endsWith('.mp4') ? (
                                <video className="diary-media" controls>
                                    <source src={media} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img className="diary-media" src={media} alt="Diary Media" />
                            )}
                        </div>
                    )}
                    <textarea
                        className="diary-textarea"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="여기에 글을 작성하세요..."
                    />
                </div>
                <div className="diary-actions">
                    <label htmlFor="media-upload" className="diary-upload-button">
                        첨부하기
                    </label>
                    <input
                        id="media-upload"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="diary-file-input"
                    />
                    <button onClick={handleSave} className="diary-save-button">임시 저장</button>
                    <button onClick={handleSubmit} className="diary-submit-button">제출</button>
                </div>
                <div className="diary-saved-entries">
                    {savedEntries.length > 0 ? (
                        savedEntries.map((entry, index) => (
                            <div key={index} className="diary-saved-entry">
                                {entry.media && (
                                    <div className="diary-saved-media-wrapper">
                                        {entry.media.endsWith('.mp4') ? (
                                            <video className="diary-saved-media" controls>
                                                <source src={entry.media} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img className="diary-saved-media" src={entry.media} alt="Saved Diary Media" />
                                        )}
                                    </div>
                                )}
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
