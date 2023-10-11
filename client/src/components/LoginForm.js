import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { setProfileData } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
  
      if (response.data.success) {
        const decoded = jwt.decode(response.data.token);
        const userProfile = response.data.userProfile;
  
        // 更新 Redux store
        dispatch(setProfileData({
          userId: decoded.token, 
          ...userProfile
        }));
  
        // 跳轉到用戶個人資料頁面
        navigate('/userprofile');
      } else {
        console.log("Operation failed: ", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded bg-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input 
          type="email" 
          {...register('email', { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && <span className="text-red-500 text-xs italic">This field is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          {...register('password', { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && <span className="text-red-500 text-xs italic">This field is required</span>}
      </div>
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
