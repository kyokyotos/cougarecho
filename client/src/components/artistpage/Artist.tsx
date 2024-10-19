import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, User, Edit2, PlusCircle } from 'lucide-react';

const ArtistPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className="bg-black text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 bg-black border-r border-gray-800">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button className="text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-800 rounded-sm"></div>
          ))}
        </div>
        <button className="mt-auto mb-4 text-gray-400 hover:text-white">
          <User className="w-6 h-6" />
        </button>
        <button className="mb-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white">
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                onClick={handleSearchClick}
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Home className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Artist Profile */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 relative">
          <div className="flex items-start mb-4">
            <div className="w-32 h-32 bg-gray-700 rounded-full mr-6"></div>
            <div>
              <p className="text-sm text-gray-400">Artist Profile</p>
              <h2 className="text-4xl font-bold">Tyler, Creator</h2>
              <p className="text-sm text-gray-400">2 Albums, 36 Songs</p>
            </div>
          </div>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* Latest Album */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Latest Album</h3>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-2xl font-bold mb-2">Trousers</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Streams: 600,00</p>
                <p className="text-sm text-gray-400">Likes/Saves: 45,000</p>
                <p className="text-sm text-gray-400">Revenue $800</p>
              </div>
            </div>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;