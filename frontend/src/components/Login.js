import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        mobile_number: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    const handleSocialLogin = (provider) => {
        alert(`Login by ${provider} clicked! `); //(Placeholder for real functionality)
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    value={formData.mobile_number}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <h3>Or Login With</h3>
            <div className="social-login-container">
                
                <button className="google-btn" onClick={() => handleSocialLogin('Google')}>
                    Login by Google
                </button>
                <button className="facebook-btn" onClick={() => handleSocialLogin('Facebook')}>
                    Login by Facebook
                </button>
                <button className="apple-btn" onClick={() => handleSocialLogin('Apple')}>
                    Login by Apple ID
                </button>
            </div>
        </div>
    );
}

export default Login;