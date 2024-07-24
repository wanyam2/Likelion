import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        termsAccepted: false,
    });

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

    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <h1>회원등록</h1>
                </div>
                <form>
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
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
