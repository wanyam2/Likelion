import React, { useState } from 'react';
import './SettingPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SettingPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        ownership: false,
        alarm: '',
        eyeMode: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleToggle = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: !prevData[field],
        }));
    };

    const handleWatchConnect = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/connect-watch/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data.message);
        } catch (error) {
            alert('스마트워치 연결에 실패했습니다.');
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <h1>내 설정</h1>
                </div>
                <form>
                    <label>
                        이름
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="이름을 입력하세요"
                        />
                    </label>
                    <label>
                        휴대폰 번호
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="휴대폰 번호를 입력하세요"
                        />
                    </label>
                    <label>
                        위치
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="위치를 입력하세요"
                        />
                    </label>
                    <label>
                        워치 소유 상태
                        <div className="watch-container">
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => handleToggle('ownership')}
                            >
                                {formData.ownership ? '있다' : '없다'}
                            </button>
                            {formData.ownership && (
                                <button
                                    type="button"
                                    className="toggle-button"
                                    onClick={handleWatchConnect}
                                    style={{ marginLeft: '10px' }}
                                >
                                    연동하기
                                </button>
                            )}
                        </div>
                    </label>
                    <label>
                        알람 시간(간격) 및 어플
                        <input
                            type="text"
                            name="alarm"
                            value={formData.alarm}
                            onChange={handleChange}
                            placeholder="알람 시간을 입력하세요"
                        />
                    </label>
                    <label>
                        눈 건강 지킴 모드
                        <div className="watch-container">
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => handleToggle('eyeMode')}
                            >
                                {formData.eyeMode ? '활성화' : '비활성화'}
                            </button>
                        </div>
                    </label>
                    <label>
                        연동된 계정
                        <div className="connected-account">
                            <div>
                                <span>N</span> 네이버 로그인
                            </div>
                        </div>
                    </label>
                    <button type="button" onClick={() => console.log('연동된 계정 수정 클릭')}>연동된 계정 수정</button>
                    <button type="button" onClick={() => console.log('내 정보 수정 클릭')}>내 정보 수정</button>
                </form>
            </div>
        </div>
    );
}

export default SettingPage; // 컴포넌트 이름에 맞추어 export
