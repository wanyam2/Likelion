// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage';
import CheckDiary from './components/diary/CheckDiary';
import PreviousDiary from './components/diary/PreviousDiary';
import RegisterPage from './components/main/RegisterPage';
import SettingPage from './components/main/SettingPage';
import StartPage from "./components/start/StartPage";
import KakaoLoginButton from './components/start/KakaoLoginButton';
import KakaoRedirectHandler from './components/start/KakaoRedirectHandler';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/check-diary" element={<CheckDiary />} />
                <Route path="/yesterday-diary" element={<PreviousDiary />} /> {/* entries 제거 */}
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/kakao/callback" element={<KakaoRedirectHandler />} />
                <Route path="/kakao-login" element={<KakaoLoginButton />} />
            </Routes>
        </Router>
    );
};

export default App;
