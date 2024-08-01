import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import
import './MoreMenu.css'; // CSS 파일을 import

const MoreMenu = () => {
    const [blueLight, setBlueLight] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

    const toggleBlueLight = () => {
        setBlueLight(prevState => !prevState);
    };

    const goToMainPage = () => {
        navigate('/main'); // MainPage로 이동
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
                    alt="Go to MainPage"
                    onClick={goToMainPage} // 클릭 시 MainPage로 이동
                />
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
