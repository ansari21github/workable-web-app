import { configureStore } from '@reduxjs/toolkit';

import {
    authenticationReducer,
    isLoggedIn,
  } from './slices/authenticationSlice.js';
  
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
  });
  
  export { store, isLoggedIn };