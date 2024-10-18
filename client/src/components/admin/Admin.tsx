import React from 'react';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, Edit2 } from 'lucide-react';

const Admin = () => {
  return (
    <div className="bg-black text-gray-300 h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        <Menu className="w-6 h-6 mb-8 text-gray-500" />
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="flex-grow"></div>
        <PlusCircle className="w-6 h-6 mb-4 text-gray-500" />
        <User className="w-6 h-6 mb-4 text-gray-500" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search for Song or Artist"
                className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Home className="w-6 h-6 text-gray-500" />
            <Settings className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Flagged Songs List */}
        <div className="flex-1 p-6 bg-gray-900">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">Admin Profile</p>
                <h2 className="text-2xl font-bold text-gray-200">anailemone</h2>
              </div>
              <Edit2 className="w-5 h-5 text-gray-500" />
            </div>
            <hr className="border-gray-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Issues</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <div className="flex items-center">
                  <Play className="w-4 h-4 mr-3" />
                  <span>Skinny</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">10 Flags</span>
                  <button className="text-red-500">Remove Song</button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <div className="flex items-center">
                  <Play className="w-4 h-4 mr-3" />
                  <span>Lunch</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">5 Flags</span>
                  <button className="text-red-500">Remove Song</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;