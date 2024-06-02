import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Button, TextInput } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { fetchDebate } from '@/services/fetchDebate';
import { fetchUser } from '@/services/fetchUser';

export const DebateChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('pending');
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  const { data: debateData, status: debateStatus, error: debateError } = useQuery(
    ['debate', id],
    () => fetchDebate(id)
  );

  useEffect(() => {
    if (debateStatus === 'success') {
      setMessages(debateData.data.messages);
    }
  }, [debateData, debateStatus]);

  useEffect(() => {
    if (debateStatus === 'success') {
      socket.current = new WebSocket(`ws://localhost:3001?room=${id}`);
      socket.current.onopen = () => {
        console.log('Connected to WebSocket');
        setStatus('connected');
      };

      socket.current.onmessage = async (event) => {
        const messageData = JSON.parse(event.data);
        const user = await fetchUser(messageData.username);
        setMessages((prevMessages) => [...prevMessages, { ...messageData, user: user.data }]);
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket connection error');
        setStatus('error');
      };

      socket.current.onclose = () => {
        console.log('WebSocket connection closed');
        setStatus('closed');
      };

      return () => {
        socket.current.close();
      };
    }
  }, [id, debateStatus]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        content: message,
        username: 'currentUser', // Replace with actual username
        publishDate: new Date().toISOString(),
      };
      socket.current.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, { ...messageData, user: { fullName: 'Current User', avatar: { mime: '', buffer: '' } } }]);
      setMessage('');
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const renderError = () => (
    <Alert color="failure">
      <span className="font-semibold">Something went wrong</span> — {error}
    </Alert>
  );

  const renderPending = () => (
    <>
      <Spinner color="pink" aria-label="Loading Spinner" />
      <p>Connecting to chat...</p>
    </>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <span className="font-semibold">{msg.user?.fullName || msg.username}</span>
              <span className="text-xs text-gray-500">{new Date(msg.publishDate).toLocaleString()}</span>
            </div>
            <p className="text-gray-800 dark:text-gray-200">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <TextInput
          id="message"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow mr-2"
        />
        <Button onClick={sendMessage} color="primary" className="bg-blue-500 hover:bg-blue-600">
          Send
        </Button>
      </div>
    </div>
  );

  return (
    <section className="bg-white dark:bg-gray-900 p-12 lg:py-16 flex flex-col gap-4 antialiased h-full">
      <h2 className="font-semibold text-2xl">Debate Chat</h2>
      {debateStatus === 'pending' && renderPending()}
      {debateStatus === 'error' && renderError()}
      {debateStatus === 'success' && status === 'connected' && renderChat()}
      {status === 'error' && renderError()}
    </section>
  );
};
