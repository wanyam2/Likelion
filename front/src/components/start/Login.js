import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 로그인 로직
        navigate('/main');
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default Login;