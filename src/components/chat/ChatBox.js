import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChatBox.css";
import NotifcationSound from "../../assets/notification.mp3";

const ChatBox = () => {
  const username = useSelector((state) => state.username);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [typingUser, setTypingUser] = useState(null);

  const ws = useRef(null);
  const chatEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    ws.current = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      ws.current.send(JSON.stringify({ type: "init", username }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        dispatch({ type: "SET_MESSAGES", payload: data.messages });
      }

      else if (data.type === "message") {
        dispatch({ type: "ADD_MESSAGE", payload: data.message });

        if (data.message.username !== username) {
          const audio = new Audio(NotifcationSound);
          audio.play().catch((e) => console.log("Sound error:", e));
        }
      }

      else if (data.type === "system") {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            username: "System",
            message: data.message,
            timestamp: data.timestamp,
            type: "system",
          },
        });
      }

      // Handle typing event
      else if (data.type === "typing") {
        setTypingUser(data.username);

        // Clear previous timeout
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
          setTypingUser(null);
        }, 2000);
      }
    };

    ws.current.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    ws.current.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, [username, dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const messagePayload = {
        type: "message",
        message: input,
        timestamp: new Date().toISOString(),
      };
      ws.current.send(JSON.stringify(messagePayload));
      setInput("");

      const audio = new Audio(NotifcationSound);
      audio.play().catch((e) => console.log("Sound error:", e));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleTyping = (e) => {
    setInput(e.target.value);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "typing",
          username,
        })
      );
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  function toTitleCase(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-container">
        <div className="chatbox-nav">
          {toTitleCase(username)}
          {typingUser && typingUser !== username && (
            <div className="typing-indicator">
              {toTitleCase(typingUser)} is typing...
            </div>
          )}
        </div>

        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`chat-message ${
                msg.type === "system"
                  ? "system"
                  : msg.username === username
                  ? "own"
                  : ""
              }`}
            >
              {msg.type === "system" ? (
                <div className="msg-text system-text">
                  <i className="msg-i">{msg.message}</i>
                </div>
              ) : (
                <>
                  <div className="msg-header">
                    <span className="msg-username">{msg.username}</span>
                    <span className="msg-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="msg-text">{msg.message}</div>
                </>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
