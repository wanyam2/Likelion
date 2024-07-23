import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage';
import StartPage from './components/start/StartPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} /> {/* 기본 경로를 /로 설정 */}
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                {/*<Route path="/yesterday-diary" element={<YesterdayDiaryPage />} />*/}
                {/*<Route path="/storage" element={<StoragePage />} />*/}
                {/*<Route path="/eye-protection" element={<EyeProtectionPage />} />*/}
                {/*<Route path="/usage" element={<UsagePage />} />*/}
            </Routes>
        </Router>
    );
};

export default App;
