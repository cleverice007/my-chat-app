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
    idealAgeRange: [20, 30], 
    idealLocation: [],       
    idealGender: [],         
  },
  reducers: {
    setProfileData: (state, action) => {
      console.log("setProfileData action:", action.payload); 
      Object.assign(state, action.payload);
    },
  },
});

export const { setProfileData } = userSlice.actions;
export default userSlice.reducer;

