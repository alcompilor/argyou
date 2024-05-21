import React from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '@/components/Signup';
import logoWhite from "@/assets/isolated-white.svg";

export const SignUp = () => {
    const navigate = useNavigate();

    const handleSignupSuccess = (data) => {
        console.log('Signup Successful:', data.message);
        navigate('/'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <img src={logoWhite} alt="Company Logo" width={60} height={60} className="mx-auto mb-4" />
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center"> 
                        Create your account
                    </h2>
                </div>
                <Signup onSignupSuccess={handleSignupSuccess} />
            </div>
        </div>
    );
};

export default SignUp;