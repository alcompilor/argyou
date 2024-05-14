import React from 'react';
import { LogIn } from '@/components/LogIn';
import { useNavigate } from 'react-router-dom';
import logoWhite from "@/assets/isolated-white.svg";


export const SignIn = () => {
    const navigate = useNavigate();
  
    const handleLoginSuccess = (data) => {
      console.log('Login Successful:', data.message);
      navigate('/'); 
    };
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
            <div className="text-center">
              <img src={logoWhite} alt="Company Logo" width={60} height={60} className="mx-auto mb-4" />
              <h2 className="text-4xl font-extrabold text-gray-800 text-center"> 
                Sign in to your account
              </h2>
            </div>
            <LogIn onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      );
    };
  
  export default SignIn;