import React, { useState } from 'react';
import axios from 'axios';
import '../style/style.css'
import FormInput from "../components/FormInput";
import Header from "../components/Header";

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3006/register', {
                username: username,
                email: email,
                password: password,
            });

            console.log('Registration successful:', response.data);
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <Header isAuthenticated={false} onLogout={() => console.log("Logout")} />
            <main>
                <h1>Registration</h1>
                <form onSubmit={handleRegistration}>
                    <FormInput onChange={handleUsernameChange} name="username" type="text" label="Username" placeholder="johnny" />
                    <FormInput onChange={handleEmailChange} name="email" type="text" label="Email" placeholder="example@email.com" />
                    <FormInput onChange={handlePasswordChange} name="password" type="password" label="Password" placeholder="********"></FormInput>
                    <button type="submit">Register</button>
                </form>
                <div>
                    <p>Already have an account? <a href="/login"><b>Sign in</b></a></p>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </main>
        </div>

    );
};

export default RegistrationPage;
