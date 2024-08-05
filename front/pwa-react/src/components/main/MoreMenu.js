// src/components/main/MoreMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueLight } from '../../contexts/BlueLightContext'; // Context 훅 import
import './MoreMenu.css';

const MoreMenu = () => {
    const { blueLight, toggleBlueLight } = useBlueLight(); // Context 사용
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/main');
    };

    return (
        <div className="more-menu-container">
            <div className={`blue-light-filter ${blueLight ? 'active' : ''}`} />
            <header className="header">
                <div className="header-text">갓생일기</div>
                <div
                    className="header-logo"
                    onClick={goToMainPage}
                >
                    <div className="burger-icon"></div>
                    <div className="burger-icon"></div>
                    <div className="burger-icon"></div>
                </div>
            </header>
            <div className="menu-content">
                <div className="menu-item switch" onClick={toggleBlueLight}>
                    <div className="switch-container">
                        <div className={`switch ${blueLight ? 'active' : ''}`}></div>
                        <span className="switch-text">
                            눈 보호모드 {blueLight ? '끄기' : '켜기'}
                        </span>
                    </div>
                </div>
                <div className="menu-item">내 정보</div>
                <div className="menu-item">이벤트</div>
                <div className="menu-item">고객센터</div>
                <div className="menu-item">연동 계정 확인하기</div>
            </div>
        </div>
    );
};

export default MoreMenu;
