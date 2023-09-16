import React, { useState } from 'react';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '18',
    gender: 'Male',
    aboutMe: '',
    interests: [],
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      interests: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <form className="p-4 max-w-xl mx-auto bg-white rounded shadow-lg" onSubmit={handleSubmit}>
      {/* Profile Picture Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
        <input type="file" name="profilePicture" />
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
        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* Buttons */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      <button type="button" className="bg-gray-500 text-white p-2 rounded ml-4">Cancel</button>
    </form>
  );
};

export default UserProfileForm;
