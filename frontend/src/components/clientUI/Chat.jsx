import React, { useEffect, useState, useRef } from "react";
import { Button, TextInput, Spinner, Alert } from "flowbite-react";
import Cookies from "js-cookie";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connection established successfully");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log("Message received from WebSocket:", event.data);
      try {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (parseError) {
        console.error("Error parsing WebSocket message:", parseError);
      }
    };

    ws.current.onerror = (event) => {
      console.error("WebSocket encountered an error:", event);
    };

    ws.current.onclose = (event) => {
      console.log(
        "WebSocket connection closed:",
        event,
        "Code:",
        event.code,
        "Reason:",
        event.reason
      );
      setIsConnected(false);
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  return { messages, isConnected };
};

export const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const token = Cookies.get("access_token");
  const hardcodedId = "665e44cb878a102874820626";

  if (!token) {
    setError("No token found");
    console.error("WebSocket connection error: No token found");
    return;
  }

  const wsUrl = `ws://localhost:3001?token=${token}&room=${hardcodedId}`;
  const { messages, isConnected } = useWebSocket(wsUrl);

  const handleSendMessage = () => {
    // Implement your message sending logic here
  };

  const handleKeyPress = (event) => {
    // Implement your key press handling logic here
  };

  const renderMessages = () => (
    <ul className="space-y-2">
      {messages.map((message, index) => (
        <li key={index} className="bg-gray-100 p-2 rounded-lg">
          <span className="font-semibold">{message.username}: </span>
          {message.content}
        </li>
      ))}
    </ul>
  );

  const renderError = () => (
    <Alert color="failure">
      <span className="font-semibold">Something went wrong</span> — {error}
    </Alert>
  );

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Debate Chat</h2>
      {!isConnected && !error && (
        <Spinner color="pink" aria-label="Loading Spinner" />
      )}
      {error && renderError()}
      {isConnected && (
        <>
          <div className="w-full max-h-96 overflow-y-auto border p-4 rounded-lg">
            {renderMessages()}
          </div>
          <div className="flex space-x-2 w-full">
            <TextInput
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} color="primary">
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
