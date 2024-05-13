import React, { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";

const SignupPage = () => {
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
    };

    return (
        <div className='container mx-auto mt-12 bg-white p-8 shadow-lg rounded-lg w-full max-w-3xl'>
            <div className='header flex flex-col items-center gap-2 w-full my-5'>
                <div className="text text-4xl font-bold text-gray-800">Sign Up</div>
                <div className='underline w-16 h-1.5 bg-gray-800 rounded-full'></div>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="Robert Green"
                        addon="@"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
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
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
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
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div className="submit-container flex justify-center mt-8">
                    <Button type="submit" className="text-white bg-rose-500 rounded-full w-56 h-12 font-bold hover:bg-rose-500">
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
