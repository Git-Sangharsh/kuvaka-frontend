import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import  "./UsernameForm.css"

const UsernameForm = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'SET_USERNAME', payload: input.trim() });
    }
  };

  return (
    <div className="username-form-container">
      <h2>Enter Your Username</h2>
      <form onSubmit={handleSubmit} className="username-form">
        <input
          type="text"
          placeholder="Username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="username-input"
        />
        <button type="submit" className="username-button">Join Chat</button>
      </form>
    </div>
  );
};

export default UsernameForm;
