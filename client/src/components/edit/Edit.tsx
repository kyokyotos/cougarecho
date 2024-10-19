import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings, Menu, User } from 'lucide-react';

const UserProfileSettings = () => {
  const [username, setUsername] = useState('anailemone');
  const [name, setName] = useState('Anailemone');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
      console.log('Password change requested');
    }
  };

  return (
    <div className="bg-[#121212] text-[#EBE7CD] h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-gray-800">
        <button aria-label="Menu" className="mb-8">
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="flex-grow"></div>
        <button aria-label="User Profile" className="mb-4">
          <User className="w-6 h-6 text-green-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200"
              />
            </div>
          </div>
          <button aria-label="Settings">
            <Settings className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Profile Settings */}
        <div className="max-w-md mx-auto w-full space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{username}</h1>
            <Link to="/admin" aria-label="Admin">
              <User className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Change Email</h2>
            <input
              type="email"
              placeholder="Old Email"
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200 mb-2"
            />
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200 mb-2"
            />
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded">
              Change Email
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Change Password</h2>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200 mb-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200 mb-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200 mb-2"
            />
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
            <button 
              onClick={handlePasswordChange}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </div>

          <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 font-bold py-2 px-4 rounded transition duration-300">
            Delete My Account
          </button>
          <p className="text-xs text-gray-500 text-center">
            Deleting your account will erase your information :(
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;