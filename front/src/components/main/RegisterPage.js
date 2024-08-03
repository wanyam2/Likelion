import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        termsAccepted: false,
    });

    const navigate = useNavigate(); // 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setFormData((prevData) => ({
            ...prevData,
            termsAccepted: !prevData.termsAccepted,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/users/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('회원 등록이 완료되었습니다.');
            navigate('/settings'); // 페이지 이동 추가
        } catch (error) {
            alert('등록에 실패했습니다.');
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <h1>회원등록</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        이름
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="사용하실 이름을 적어주세요."
                        />
                    </label>
                    <label>
                        휴대폰 번호
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="인증번호를 받을 전화번호를 적어주세요."
                        />
                        <button type="button">인증요청</button>
                    </label>
                    <label>
                        이용약관
                        <div className="terms">
                            여기에 이용약관 내용이 들어갑니다.
                        </div>
                    </label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleCheckboxChange}
                        />
                        <label>전체 동의하시겠습니까?</label>
                    </div>
                    <button type="submit">등록</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
