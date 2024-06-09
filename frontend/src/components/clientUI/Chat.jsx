import React, { useEffect, useState, useRef } from "react";
import { Spinner, Alert } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useAuthState } from "@/hooks/useAuthState";
import { HeatBar } from "../HeatBar";
import { useParams } from "react-router-dom";

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
      if (event.data.errorMessage) {
        return event.data.errorMessage;
      } else {
        try {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some((msg) => msg === message);
            if (!messageExists) {
              return [...prevMessages, message];
            }
            return prevMessages;
          });
        } catch (parseError) {
          console.error("Error parsing WebSocket message:", parseError);
        }
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
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [url]);

  return { isConnected, ws };
};

export const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const token = Cookies.get("access_token");
  const username = useAuthState();
  const { id } = useParams();

  const {
    data: debateData,
    error: debateError,
    isSuccess,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["debateData"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/debates/${id}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          throw err;
        }),
    refetchInterval: 2,
  });

  if (!token) {
    setError("No token found");
    console.error("WebSocket connection error: No token found");
    return;
  }

  const wsUrl = `${import.meta.env.VITE_BACKEND_WS}?token=${token}&room=${id}`;
  const { isConnected, ws } = useWebSocket(wsUrl);

  const handleSendMessage = () => {
    if (newMessage.trim() && ws.current) {
      if (
        ((debateData.data.turn === "creator" &&
          debateData.data.creatorUsername === username) ||
          (debateData.data.turn === "opponent" &&
            debateData.data.opponentUsername === username) ||
          debateData.data.turn === "Open Chat") &&
        debateData.data.status === "Ongoing"
      ) {
        ws.current.send(JSON.stringify(newMessage));
        setNewMessage("");
      } else {
        setNewMessage("");
      }
    }
  };

  const renderError = () => (
    <Alert color="failure">
      <span className="font-semibold">Something went wrong</span> — {error}
    </Alert>
  );

  return (
    <div className="bg-gray-700 pt-4 pb-32 pl-10 flex flex-col justify-center items-center min-h-screen">
      <div
        className="flex justify-center items-center w-full"
        style={{ height: "560px" }}
      >
        <div
          className="h-full p-4 flex flex-col justify-center items-center relative"
          style={{ width: "450px" }}
        >
          <div className="flex flex-col items-center space-y-4 p-3 bg-white shadow-md rounded-lg w-full h-full">
            {!isConnected && !error && (
              <Spinner color="pink" aria-label="Loading Spinner" />
            )}
            {error && renderError()}
            {isConnected && isSuccess && (
              <>
                <div className="p-2 rounded bg-gray-700 text-white font-medium text-sm w-full text-center">
                  <p className="text-rose-400 mb-1">Debate Question:</p>
                  <p className="text-rose-400 mb-1">
                    {debateData.data.debatedQuestion}
                  </p>
                  {debateData.data.turn === "creator" && (
                    <p className="text-red-300">
                      @{debateData.data.creatorUsername} has five minutes to
                      take a stand
                    </p>
                  )}
                  {debateData.data.turn === "opponent" && (
                    <p className="text-red-300">
                      @{debateData.data.opponentUsername} has five minutes to
                      take a stand
                    </p>
                  )}
                  {debateData.data.turn === "Open Chat" &&
                    debateData.data.status != "Ended" && (
                      <p className="text-green-300">
                        Open chat has been activated, debaters are urged to keep
                        a nice tone.
                      </p>
                    )}
                  {debateData.data.status === "Ended" && (
                    <p className="text-green-300">Ended</p>
                  )}
                </div>
                <div className="flex-1 w-full overflow-y-auto border p-4 rounded-lg">
                  {debateData.data.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.username === debateData.data.creatorUsername
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="p-2 mb-2 rounded-lg max-w-44 w-auto bg-rose-200">
                        <p className="text-sm break-words">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {isSuccess &&
                  (debateData.data.creatorUsername === username ||
                    debateData.data.opponentUsername === username) && (
                    <div className="w-full h-13 p-1 pt-4 bg-white border-t flex">
                      <input
                        id="user-input"
                        type="text"
                        placeholder="Type a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                      <button
                        id="send-button"
                        onClick={handleSendMessage}
                        className="bg-rose-500 text-white px-4 py-2 rounded-r-md transition duration-300"
                      >
                        Send
                      </button>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
