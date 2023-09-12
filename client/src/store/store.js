import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  

export default configureStore({
  reducer: {
    user: userReducer  // 使用 userReducer 來處理 'user' 這個 slice 的狀態
  }
});
