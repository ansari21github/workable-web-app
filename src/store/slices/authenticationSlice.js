import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    isLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
});

export const { isLoggedIn } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;