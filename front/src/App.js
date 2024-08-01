// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage';
import CheckDiary from './components/diary/CheckDiary';
import Storage from './components/diary/Storage';
import RegisterPage from './components/main/RegisterPage';
import SettingPage from './components/main/SettingPage';
import StartPage from './components/start/StartPage';
import KakaoLoginButton from './components/start/KakaoLoginButton';
import KakaoRedirectHandler from './components/start/KakaoRedirectHandler';

// 상태 관리 라이브러리를 사용할 수도 있습니다.
const App = () => {
    const [userId, setUserId] = useState(null);
    const [entries, setEntries] = useState([]);

    // 유저 정보 요청 후 상태 업데이트 (예: 로그인 후)
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user/info'); // 유저 정보 가져오기
            setUserId(response.data.userId); // 유저 ID 저장
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    // Diary 데이터 가져오기
    useEffect(() => {
        const fetchDiaryEntries = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/diary/entries`, {
                        params: { userId },
                    });
                    setEntries(response.data.entries); // Diary entries 저장
                } catch (error) {
                    console.error('Failed to fetch diary entries:', error);
                }
            }
        };

        fetchDiaryEntries();
    }, [userId]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/check-diary" element={<CheckDiary />} />
                <Route path="/storage" element={<Storage entries={entries} />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/kakao/callback" element={<KakaoRedirectHandler />} />
                <Route path="/kakao-login" element={<KakaoLoginButton />} />
            </Routes>
        </Router>
    );
};

export default App;
