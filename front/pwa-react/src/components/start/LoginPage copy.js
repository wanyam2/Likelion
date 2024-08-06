import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가
import Cookies from 'js-cookie';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://13.125.0.218:8000/auth/login/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            // Cookies.set('authaccess', response.data.access, { expires: 7 }); // 7일 동안 유효한 쿠키 설정
            // Cookies.set('authrefresh', response.data.refresh, { expires: 7 }); // 7일 동안 유효한 쿠키 설정

            alert('로그인 되었습니다.');
            navigate('/main'); // 페이지 이동 추가
        } catch (error) {
            alert('없는 회원이므로 회원가입으로 넘어갑니다.');
            navigate('/register');
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <h1>로그인</h1>
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
                        비밀번호
                        <input
                            type="password"
                            name="pw"
                            value={formData.pw}
                            onChange={handleChange}
                            placeholder="비밀번호를 적어주세요."
                        />
                    </label>
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
