import React, { useState } from 'react';
import './signup.css';
import { Button, Label, TextInput } from "flowbite-react";

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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="Bonnie Green"
                        addon="@"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@flowbite.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-container">
                    <Button type="submit">
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
