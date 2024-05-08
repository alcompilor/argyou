import React, { useState } from 'react';
import './signup.css';

const SignupPage = () => {
    const [action, setAction] = useState("Sign Up");

    // State to store user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // Continue later with sending data to the backend server
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className="text">{action}</div>
                <div className='underline'></div>
            </div>
            <form className="inputs" onSubmit={handleSubmit}>
                <div className="input">
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="submit-container">
                    <button type='submit' className='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
