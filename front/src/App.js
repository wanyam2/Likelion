// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlueLightProvider, useBlueLight } from './contexts/BlueLightContext';
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
import './index.css'; // CSS 파일 import

const AppContent = () => {
    const { blueLight } = useBlueLight();

    useEffect(() => {
        document.body.classList.toggle('blue-light-mode', blueLight);
    }, [blueLight]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/check-diary" element={<CheckDiary />} />
                <Route path="/storage" element={<Storage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/kakao/callback" element={<KakaoRedirectHandler />} />
                <Route path="/kakao-login" element={<KakaoLoginButton />} />
            </Routes>
        </Router>
    );
};

function App() {
    return (
        <BlueLightProvider>
            <AppContent />
        </BlueLightProvider>
    );
}

export default App;
