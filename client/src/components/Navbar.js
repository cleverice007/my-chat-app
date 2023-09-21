import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-gray-600 text-white p-4">
      <span className="mx-2 cursor-pointer hover:text-gray-300">聊天</span>
      <span className="mx-2 cursor-pointer hover:text-gray-300">個人檔案</span>
      <span className="mx-2 font-bold text-2xl cursor-pointer hover:text-gray-300">Tinder</span>
    </div>
  );
};

export default Navbar;
