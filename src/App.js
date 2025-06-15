import React from 'react';
import UsernameForm from './components/form/UsernameForm';
import ChatBox from './components/chat/ChatBox';
import { useSelector } from 'react-redux';
import  "./App.css";

const App = () => {
  const username = useSelector((state) => state.username);

  return (
    <div  className='App'>
      {username ? <ChatBox /> : <UsernameForm />}
    </div>
  );
};

export default App;
