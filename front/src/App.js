import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/start/StartPage';
import Login from './components/start/Login';
import MainPage from './components/main/MainPage';
import PreviousDiaries from './components/main/PreviousDiaries';
import Settings from './components/main/Settings';
import WriteDiary from './components/main/WriteDiary';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/previous-diaries" element={<PreviousDiaries />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/write-diary" element={<WriteDiary />} />
            </Routes>
        </Router>
    );
};

export default App;
