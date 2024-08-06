import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './DiaryPage.css';

// 날짜 포맷 함수
const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '유효하지 않은 날짜';  // 유효하지 않은 날짜 처리
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};


const DiaryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [media, setMedia] = useState(null);
    const [savedEntries, setSavedEntries] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [sleepData, setSleepData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const { alarm } = location.state || {};

    // 수면 데이터 로드
    useEffect(() => {
        const fetchSleepData = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get('/api/sleep-data/', { params: { user_id: userId } });
                setSleepData(response.data);
            } catch (error) {
                setErrorMessage('수면 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.');
                console.error('Failed to fetch sleep data:', error);
            }
        };

        fetchSleepData();
    }, []);

    // 알림 데이터 처리
    useEffect(() => {
        if (alarm) {
            setText(`알람 시간 설정: ${alarm}`);
        }
    }, [alarm]);

    // 미디어 URL 관리
    useEffect(() => {
        let mediaUrl;
        if (media) {
            mediaUrl = URL.createObjectURL(media);
        }
        return () => {
            if (mediaUrl) URL.revokeObjectURL(mediaUrl);
        };
    }, [media]);

    // 텍스트 변경 핸들러
    const handleTextChange = (e) => {
        setText(e.target.value);
        setIsChanged(true);
    };

    // 미디어 변경 핸들러
    const handleMediaChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setMedia(file);
            setIsChanged(true);
        }
    };

    // 임시 저장 핸들러
    const handleSave = () => {
        if (text.trim() || media) {
            const entry = { text, media, date: new Date() };
            setSavedEntries((prevEntries) => [
                ...prevEntries,
                entry,
            ]);
            localStorage.setItem('diaryPageState', JSON.stringify({
                text: text,
                media: media ? URL.createObjectURL(media) : null,
                savedEntries: [...savedEntries, entry],
            }));
            setText('');
            setMedia(null);
            setIsChanged(false);
        }
    };

    // 컴포넌트가 마운트될 때 localStorage에서 상태를 복원
    useEffect(() => {
        const savedState = localStorage.getItem('diaryPageState');
        if (savedState) {
            const { text, media, savedEntries } = JSON.parse(savedState);
            setText(text);
            setSavedEntries(savedEntries);
            if (media) {
                setMedia(media);  // 이전에 저장된 media URL을 복원
            }
        }
    }, []);

    // 제출 핸들러
    const handleSubmit = async () => {
        if (text.trim() || media) {
            const userId = localStorage.getItem('userId');
            const formData = new FormData();
            formData.append('text', text);
            if (media) formData.append('media', media);
            formData.append('date', new Date().toISOString().split('T')[0]);

            try {
                await axios.post('/api/diary-entry/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                setSavedEntries((prevEntries) => [
                    ...prevEntries,
                    { text, media, date: new Date() },
                ]);
                localStorage.removeItem('diaryPageState');  // 성공적으로 제출 후 상태 삭제
                setText('');
                setMedia(null);
                setIsChanged(false);
                alert('제출되었습니다!');
            } catch (error) {
                setErrorMessage('제출에 실패했습니다. 다시 시도해주세요.');
                console.error('Failed to create diary entry:', error);
            }
        }
    };

    // 뒤로가기 핸들러
    const handleBack = () => {
        if (isChanged) {
            if (window.confirm('변경 사항이 있습니다. 저장하시겠습니까?')) {
                handleSave();
                navigate('/main');
            } else if (window.confirm('저장하지 않고 이동하시겠습니까?')) {
                localStorage.removeItem('diaryPageState');  // 저장하지 않고 이동할 경우 상태 삭제
                navigate('/main');
            }
        } else {
            navigate('/main');
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
                            {media.type.startsWith('video') ? (
                                <video className="diary-media" controls>
                                    <source src={URL.createObjectURL(media)} type={media.type} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img className="diary-media" src={URL.createObjectURL(media)} alt="Diary Media" />
                            )}
                        </div>
                    )}
                    <textarea
                        className="diary-textarea"
                        value={text}
                        onChange={handleTextChange}  // Ensure this function is defined
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
                        onChange={handleMediaChange}  // Ensure this function is defined
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
                                        {entry.media.type.startsWith('video') ? (
                                            <video className="diary-saved-media" controls>
                                                <source src={URL.createObjectURL(entry.media)} type={entry.media.type} />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img className="diary-saved-media" src={URL.createObjectURL(entry.media)} alt="Saved Diary Media" />
                                        )}
                                    </div>
                                )}
                                <p className="diary-saved-text">{entry.text}</p>
                                <p className="diary-saved-date">{formatDate(entry.date)}</p>
                            </div>
                        ))
                    ) : (
                        <p>저장된 항목이 없습니다.</p>
                    )}
                </div>
                {sleepData.length > 0 && (
                    <div className="diary-sleep-data">
                        <h3>수면 데이터</h3>
                        <ul>
                            {sleepData.map((entry, index) => (
                                <li key={index}>
                                    <strong>Start:</strong> {new Date(entry.start_date).toLocaleString()} <br />
                                    <strong>End:</strong> {new Date(entry.end_date).toLocaleString()} <br />
                                    <strong>Duration:</strong> {(new Date(entry.end_date) - new Date(entry.start_date)) / 60000} minutes
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="diary-bottom">
                <div className="diary-bottom-text">오늘의 나는 어떠했나요?</div>
            </div>
        </div>
    );
};

export default DiaryPage;
