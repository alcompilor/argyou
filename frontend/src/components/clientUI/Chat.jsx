import { useEffect, useState, useRef } from "react";
import { Spinner, Alert } from "flowbite-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useAuthState } from "@/hooks/useAuthState";
import { useParams } from "react-router-dom";
import { fetchDebate } from "@/services/fetchDebate";
import { addReadyDebater } from "@/services/addReadyDebater";
import { formatDate } from "@/utils/formatDate.js";

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
      }
      try {
        console.log("Event data", event.data);
        const message = event.data;
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
    queryFn: () => fetchDebate(id),
    refetchInterval: 1000,
  });

  const {
    mutate,
    error: mutationError,
    isSuccess: mutationSucceeded,
  } = useMutation({
    mutationFn: addReadyDebater,
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

  const handleReadyDebater = () => {
    mutate({ id });
  };

  const renderError = () => (
    <Alert color="failure">
      <span className="font-semibold">Something went wrong</span> —{" "}
      {debateError}
    </Alert>
  );

  return (
    <div className="flex justify-center items-center h-[560px] md:max-w-2xl w-full">
      <div className="h-full flex flex-col justify-center items-center relative w-full">
        <div className="flex flex-col items-center space-y-4 p-3 bg-white shadow-md rounded-2xl w-full h-full">
          {!isConnected && !debateError && (
            <Spinner color="pink" aria-label="Loading Spinner" />
          )}
          {debateError && renderError()}
          {isConnected && isSuccess && (
            <>
              <div className="p-2 rounded-lg bg-gray-700 text-white font-medium text-sm w-full text-center">
                <p className="text-zinc-50 mb-1 font-semibold">
                  Current Question:
                </p>
                <p className="text-rose-400 mb-1 font-bold text-lg">
                  {debateData.data.debatedQuestion}
                </p>
                {!debateData.data.readyDebaters.includes(
                  debateData.data.creatorUsername
                ) ||
                !debateData.data.readyDebaters.includes(
                  debateData.data.opponentUsername
                ) ? (
                  <p className="text-red-300 font-semibold">
                    Debaters are not ready yet
                  </p>
                ) : debateData.data.turn === "creator" ? (
                  <p className="text-red-300 font-semibold">
                    @{debateData.data.creatorUsername} has five minutes to take
                    a stand
                  </p>
                ) : debateData.data.turn === "opponent" ? (
                  <p className="text-red-300 font-semibold">
                    @{debateData.data.opponentUsername} has five minutes to take
                    a stand
                  </p>
                ) : debateData.data.turn === "Open Chat" ? (
                  <p className="text-green-300 font-semibold">
                    Open chat has been activated, debaters are urged to keep a
                    nice tone.
                  </p>
                ) : (
                  debateData.data.status === "Ended" && (
                    <p className="text-green-300 font-semibold">Ended</p>
                  )
                )}
              </div>
              <div className="flex-1 w-full overflow-y-auto border p-4 rounded-lg">
                {debateData.data.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      message.username === debateData.data.creatorUsername
                        ? "items-end"
                        : "items-start"
                    } mb-2`}
                  >
                    <div className="p-2 rounded-xl max-w-[23ch] md:max-w-[33ch] w-auto bg-rose-100">
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(message.publishDate)}
                    </p>
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
      {isSuccess &&
        (debateData.data.creatorUsername === username ||
          debateData.data.opponentUsername === username) &&
        !debateData.data.readyDebaters.includes(username) && (
          <button
            onClick={handleReadyDebater}
            className="bg-green-500 hover:bg-green-600 transition duration-300 text-white font-semibold rounded-lg w-28 p-3 ml-2 mb-5"
          >
            Ready
          </button>
        )}
    </div>
  );
};
