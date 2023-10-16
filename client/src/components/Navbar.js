import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-gray-600 text-white p-4">
            <span className="mx-4 font-bold text-2xl cursor-pointer hover:text-gray-300">
                Tinder
            </span>
            <Link to="/chat" className="mx-4 cursor-pointer hover:text-gray-300">
                聊天
            </Link>
            <Link to="/userprofile" className="mx-4 cursor-pointer hover:text-gray-300">
                個人檔案
            </Link>
            <Link to="/match" className="mx-4 cursor-pointer hover:text-gray-300">
                配對
            </Link>
        </div>
    );
};


export default Navbar;
