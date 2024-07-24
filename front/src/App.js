import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage';
import StartPage from './components/start/StartPage';
import CheckDiary from './components/diary/CheckDiary';
// Import other components as needed
import PreviousDiary from './components/diary/PreviousDiary';
// import StoragePage from './components/other/StoragePage';
// import EyeProtectionPage from './components/other/EyeProtectionPage';
// import UsagePage from './components/other/UsagePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} /> {/* 기본 경로를 /로 설정 */}
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/check-diary" element={<CheckDiary />} />
                 <Route path="/previous-diary" element={<PreviousDiary />} />
                {/* <Route path="/storage" element={<StoragePage />} /> */}
                {/* <Route path="/eye-protection" element={<EyeProtectionPage />} /> */}
                {/* <Route path="/usage" element={<UsagePage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
