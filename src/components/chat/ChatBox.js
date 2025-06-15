import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChatBox.css";
import NotifcationSound from "../../assets/notification.mp3";

const ChatBox = () => {
  const username = useSelector((state) => state.username);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const ws = useRef(null);
  const chatEndRef = useRef(null);

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

      // Handle regular messages
      else if (data.type === "message") {
        dispatch({ type: "ADD_MESSAGE", payload: data.message });

        if (data.message.username !== username) {
          const audio = new Audio(NotifcationSound);
          audio.play().catch((e) => console.log("Sound error:", e));
        }
      }

      // Handle system messages like join/leave
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

  const formatTime = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-container">
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
                  <i  className="msg-i">{msg.message}</i>
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
            onChange={(e) => setInput(e.target.value)}
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
