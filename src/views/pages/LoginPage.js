import React, { useState } from 'react';
import axios from 'axios';
import '../style/style.css'
import FormInput from "../components/FormInput";
import Header from "../components/Header";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3006/login', {
                username: username,
                password: password,
            });

            console.log('Login successful:', response.data);
        } catch (error) {
            setErrorMessage('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <Header isAuthenticated={false} onLogout={() => console.log("Logout")} />
            <main>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <FormInput onChange={handleUsernameChange} name="username" type="text" label="Username" placeholder="johnny" />
                    <FormInput onChange={handlePasswordChange} name="password" type="password" label="Password" placeholder="********"></FormInput>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <div>
                    <p>Don't have an account? <a href="/register"><b>Sign up</b></a></p>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </main>
        </div>
    );
};

export default LoginPage;
