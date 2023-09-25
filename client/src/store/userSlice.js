import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    profilePicture: null,
    name: '',
    age: 18, 
    gender: 'Male',
    aboutMe: '',
    interests: [],
    location: '',
  },
  reducers: {
    setProfileData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setProfileData } = userSlice.actions;
export default userSlice.reducer;

