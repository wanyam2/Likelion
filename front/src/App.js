import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/start/StartPage';
import MainPage from './components/main/MainPage';
import DiaryPage from './components/diary/DiaryPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/diary" element={<DiaryPage />} />
            </Routes>
        </Router>
    );
};

export default App;
