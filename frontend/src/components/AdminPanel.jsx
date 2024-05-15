// AdminPanel.jsx

import React, { useState, useEffect } from 'react';

export const AdminPanel = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/debates');
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

  const handleDeleteDebate = async (debateId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/debates/${debateId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete debate');
      }
      setDebates(debates.filter(debate => debate._id !== debateId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEndDebate = async (debateId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/debates/${debateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Ended' }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to end debate');
      }
      setDebates(debates.map(debate => debate._id === debateId ? { ...debate, status: 'Ended' } : debate));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteMessage = async (debateId, messageId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/debates/${debateId}/messages/${messageId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete message');
      }
      setDebates(debates.map(debate => 
        debate._id === debateId ? { ...debate, messages: debate.messages.filter(msg => msg._id !== messageId) } : debate
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {debates.map(debate => (
          <li key={debate._id} className="mb-4">
            <h2 className="text-xl font-semibold">{debate.title}</h2>
            <p>Status: {debate.status}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => handleDeleteDebate(debate._id)}
            >
              Delete Debate
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleEndDebate(debate._id)}
            >
              End Debate
            </button>
            <ul className="mt-2">
              {debate.messages.map(msg => (
                <li key={msg._id} className="mt-1">
                  <p>{msg.content} by {msg.username}</p>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDeleteMessage(debate._id, msg._id)}
                  >
                    Delete Message
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
