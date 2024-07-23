import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage'; // 필요한 페이지들 import

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                {/*<Route path="/yesterday-diary" element={<YesterdayDiaryPage />} />*/}
                {/*<Route path="/storage" element={<StoragePage />} />*/}
                {/*<Route path="/eye-protection" element={<EyeProtectionPage />} />*/}
                {/*<Route path="/usage" element={<UsagePage />} />*/}
                <Route path="/" element={<MainPage />} /> {/* 기본 경로를 /main으로 설정 */}
            </Routes>
        </Router>
    );
};

export default App;
