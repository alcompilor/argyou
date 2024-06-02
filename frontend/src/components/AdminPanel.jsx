// AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "flowbite-react";
import { useAuthState } from '@/hooks/useAuthState';

export const AdminPanel = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authState = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!authState) {
        navigate('/');
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${authState}`, 
        {
          method: 'GET',
          credentials: 'include',
        }
      );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data');
        }
        if (!data.data.isAdmin) {
          navigate('/');
        }
      } catch (error) {
        setError(error.message);
        navigate('/');
      }
    };

    checkAdmin();
  }, [authState, navigate]);

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}//api/v1/debates`, 
        {
          method: 'GET',
          credentials: 'include',
        }
      );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch debates');
        }
        setDebates(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDebates();
  }, []);

  const handleDeleteDebate = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/debates/${id}`,
       {
        method: 'DELETE',
        credentials: 'include',
      }
    );

      if (!response.ok) {
        throw new Error('Failed to delete debate');
      }

      setDebates(debates.filter(debate => debate._id !== id));
      setSuccess('Debate deleted successfully');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  const handleEndDebate = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}//api/v1/debates/${id}`, 
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Ended' }),
      }
    );

      if (!response.ok) {
        throw new Error('Failed to end debate');
      }

      const updatedDebate = await response.json();
      setDebates(debates.map(debate => (debate._id === id ? updatedDebate.data : debate)));
      setSuccess('Debate ended successfully');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Admin Panel</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Current Debates</h3>
        <ul className="space-y-6">
          {debates.map(debate => (
            <li key={debate._id} className="border p-6 rounded-lg shadow-lg bg-white">
              <h4 className="text-xl font-bold mb-2">{debate.title}</h4>
              <p className="text-gray-700 mb-1">Created by: {debate.creatorUsername}</p>
              <p className="text-gray-700 mb-3">Status: {debate.status}</p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => handleDeleteDebate(debate._id)}
                  color="failure"
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  Delete Debate
                </Button>
                <Button
                  onClick={() => handleEndDebate(debate._id)}
                  color="failure"
                  className="bg-red-500 hover:bg-red-600"
                >
                  End Debate
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};