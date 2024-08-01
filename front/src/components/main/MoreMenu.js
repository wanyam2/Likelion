import React, { useState } from 'react';
import './MoreMenu.css'; // CSS 파일을 import

const MoreMenu = () => {
    const [blueLight, setBlueLight] = useState(false);

    const toggleBlueLight = () => {
        setBlueLight(prevState => !prevState);
    };

    return (
        <div className="more-menu-container">
            <div className={`blue-light-filter ${blueLight ? 'active' : ''}`} />
            <header className="header">
                <div className="header-text">갓생일기</div>
                <img
                    className="header-logo"
                    width="39"
                    height="20"
                    src="/Vector10_103.png"
                    alt="Close"
                    onClick={() => {/* Navigate to /main */}}
                />
            </header>
            <div className="menu-content">
                <div className="menu-item" onClick={toggleBlueLight}>
                    눈 보호모드 {blueLight ? '끄기' : '켜기'}
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
