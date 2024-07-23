import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import MoreMenu from './components/main/MoreMenu';
import DiaryPage from './components/diary/DiaryPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/yesterday-diary" element={<div>어제의 일기 페이지</div>} />
                <Route path="/storage" element={<div>일기 저장소 페이지</div>} />
                <Route path="/eye-protection" element={<div>눈 보호모드 페이지</div>} />
                <Route path="/usage" element={<div>내 사용량 페이지</div>} />
            </Routes>
        </Router>
    );
};

export default App;
