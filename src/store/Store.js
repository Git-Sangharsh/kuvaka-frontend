import { configureStore } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  username: '',
  messages: [],
};

// Reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

// Store
const store = configureStore({
  reducer: Reducer,
});

export default store;
