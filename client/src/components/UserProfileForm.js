import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import TaiwanCitySelector from './TaiwanCitySelector';



const UserProfileForm = () => {
  const userId = useSelector((state) => state.user.userId); // 從 Redux store 中取得 userId
  const userProfile = useSelector((state) => state.user); // 從 Redux store 中取得 userProfile
  const [formData, setFormData] = useState({
    profilePicture: userProfile.profilePicture || null,
    name: userProfile.name || '',
    age: userProfile.age || '18',
    gender: userProfile.gender || 'Male',
    aboutMe: userProfile.aboutMe || '',
    interests: userProfile.interests || [],
    location: userProfile.location || '',
    idealAgeRange: userProfile.idealAgeRange || [20, 30], // 理想年紀範圍
    idealLocation: userProfile.idealLocation || [], // 理想地區
    idealGender: userProfile.idealGender || [] // 理想性別
  });

  useEffect(() => {
    console.log("useEffect triggered", userProfile.profilePicture); // 印出 userProfile.profilePicture 確保它有值
    if (userProfile.profilePicture) {
      setProfilePicturePreview(userProfile.profilePicture);
    }

    setFormData({
      profilePicture: userProfile.profilePicture || null,
      name: userProfile.name || '',
      age: userProfile.age || '18',
      gender: userProfile.gender || 'Male',
      aboutMe: userProfile.aboutMe || '',
      interests: userProfile.interests || [],
      location: userProfile.location || '',
      idealAgeRange: userProfile.idealAgeRange || [20, 30], // 理想年紀範圍
      idealLocation: userProfile.idealLocation || [], // 理想地區
      idealGender: userProfile.idealGender || [] // 理想性別
    });
  }, [userProfile]);

  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);
  


  // 用於儲存 Base64 編碼的預覽圖片
  const [profilePicturePreview, setProfilePicturePreview] = useState(userProfile.profilePicture || null);
  // 用於儲存原始的 File 物件
  const [profilePicture, setprofilePicture] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange called for ${name} with value: ${value}`); // 添加 log 來追蹤
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    let newMinAge = formData.idealAgeRange[0];
    let newMaxAge = formData.idealAgeRange[1];

    if (name === "idealAgeMin") {
      newMinAge = value;
    } else if (name === "idealAgeMax") {
      newMaxAge = value;
    }

    if (parseInt(newMinAge) >= parseInt(newMaxAge)) {
      alert("最小年齡必須小於最大年齡");
      return;
    }

    setFormData({
      ...formData,
      idealAgeRange: [newMinAge, newMaxAge],
    });
  };


  const handleMultiSelect = (e) => {
    const { name } = e.target;
    const value = Array.from(e.target.selectedOptions, option => option.value);
    console.log(`handleMultiSelect called for ${name} with value: ${value.join(', ')}`); // 添加 log 來追蹤
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('userId', userId);
    form.append('profilePicture', profilePicture);
    form.append('name', formData.name);
    form.append('age', formData.age);
    form.append('gender', formData.gender);
    form.append('aboutMe', formData.aboutMe);
    form.append('interests', JSON.stringify(formData.interests));
    form.append('location', formData.location);
    form.append('idealAgeRange', JSON.stringify(formData.idealAgeRange));
    form.append('idealLocation', JSON.stringify(formData.idealLocation));
    form.append('idealGender', JSON.stringify(formData.idealGender));


    try {
      const apiUrl = "/api/userprofiles";
      const response = await axios.post(apiUrl, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedData = response.data;
      // 將資料存到 Redux store
      dispatch(setProfileData(updatedData));
      // 使用 SPA 的形式跳轉到 ChatPage
      navigate('/chat');

    } catch (error) {
      console.log("API Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setprofilePicture(file); // 儲存原始的 File 物件
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        setProfilePicturePreview(previewUrl); // 使用 Base64 顯示預覽
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <form className="p-4 max-w-xl mx-auto bg-white rounded shadow-lg" onSubmit={handleSubmit}>
      {/* Profile Picture Preview */}
      {profilePicturePreview && (
        <div className="mb-4">
          <img src={profilePicturePreview} alt="Profile Preview" style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px'
          }} />
        </div>
      )}
      {/* Profile Picture Upload */}
      <div className="mb-4">
        <label>Profile Picture:</label>
        <input type="file" name="profilePicture" onChange={handleFileChange} />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* Age */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
        <select name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded">
          {/* Generate age options from 18 to 100 */}
          {Array.from({ length: 83 }, (_, i) => i + 18).map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Gender:</span>
        <label>
          <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
          Female
        </label>
        {/* Add more radio buttons for other gender options */}
      </div>

      {/* About Me */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">About Me:</label>
        <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows="4" className="w-full p-2 border rounded"></textarea>
      </div>

      {/* Interests */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Interests:</label>
        <select multiple name="interests" value={formData.interests} onChange={handleMultiSelect} className="w-full p-2 border rounded">
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Art">Art</option>
        </select>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
        <TaiwanCitySelector onChange={handleChange} value={formData.location} name='location' />
      </div>
      {/* 理想年紀 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ideal Age Range:</label>
        <select
          name="idealAgeMin"
          value={formData.idealAgeRange[0]}
          onChange={handleAgeChange}
          className="w-full p-2 border rounded"
        >
          {
            Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>{age}</option>
            ))
          }
        </select>
        ~
        <select
          name="idealAgeMax"
          value={formData.idealAgeRange[1]}
          onChange={handleAgeChange}
          className="w-full p-2 border rounded"
        >
          {
            Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>{age}</option>
            ))
          }
        </select>
      </div>

      {/* 理想地區 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ideal Locations:</label>
        <TaiwanCitySelector
          onChange={handleMultiSelect}
          value={formData.idealLocation}
          name='idealLocation'
          multiple={true}
        />
        {/* 這裡顯示已選擇的地點 */}
        <p className="mt-2 text-sm text-gray-600">
          Selected Locations: {formData.idealLocation.join(', ')}
        </p>
      </div>



      {/* 理想性別 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ideal Gender:</label>
        <select multiple name="idealGender" value={formData.idealGender} onChange={handleMultiSelect} className="w-full p-2 border rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>


      {/* Buttons */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      <button type="button" className="bg-gray-500 text-white p-2 rounded ml-4">Cancel</button>
    </form>
  );
};

export default UserProfileForm;
