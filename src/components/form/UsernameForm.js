import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./UsernameForm.css";

const UsernameForm = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); // Add error state
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "SET_USERNAME", payload: input.trim() });
      setError(""); // Clear error if input is valid
    } else {
      setError("Please enter a username.");
    }
  };

  return (
    <div className="username-wrapper">
      <div className="username-form-container">
        <h2 className="username-title">Enter Your Username</h2>
        <form onSubmit={handleSubmit} className="username-form">
          <input
            type="text"
            placeholder="Username"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(""); // clear error as user types
            }}
            className={`username-input ${error ? "input-error" : ""}`}
          />
          <button type="submit" className="username-button">
            Join Chat
          </button>
          <p className={`error-message ${error ? "show" : ""}`}>
  {error || "\u00A0" /* Non-breaking space to preserve layout */}
</p>

        </form>
      </div>
    </div>
  );
};

export default UsernameForm;
