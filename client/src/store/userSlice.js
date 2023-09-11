import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    targetUsername: '',
    messages: [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setTargetUsername: (state, action) => {
      state.targetUsername = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setUsername, setTargetUsername, addMessage } = userSlice.actions;

export default userSlice.reducer;
