import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가
import Cookies from 'js-cookie';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pw: '',
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
            const response = await axios.post('http://13.125.0.218:8000/auth/register/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Cookies.set('authaccess', response.data.access, { expires: 7 }); // 7일 동안 유효한 쿠키 설정
            Cookies.set('authrefresh', response.data.refresh, { expires: 7 }); // 7일 동안 유효한 쿠키 설정

            alert('회원 등록이 완료되었습니다.');
            navigate('/main'); // 페이지 이동 추가
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
                        아이디
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="사용하실 이름을 적어주세요."
                        />
                    </label>
                    <label>
                        이메일
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일을 적어주세요."
                        />
                    </label>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            name="pw"
                            value={formData.pw}
                            onChange={handleChange}
                            placeholder="비밀번호를 적어주세요."
                        />
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
