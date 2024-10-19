import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, Edit2, Loader, X } from 'lucide-react';

// Mock API (unchanged)
const mockApi = {
  fetchAdminProfile: () => new Promise(resolve => 
    setTimeout(() => resolve({ name: 'anailemone', playlists: 70 }), 500)
  ),
  fetchIssues: () => new Promise(resolve => 
    setTimeout(() => resolve([
      { id: 1, name: 'Skinny', flags: 10 },
      { id: 2, name: 'Lunch', flags: 5 },
    ]), 500)
  ),
  removeSong: (songId) => new Promise(resolve => 
    setTimeout(() => resolve(), 500)
  ),
};

// Updated Modal Component
const Modal = ({ isOpen, onClose, onConfirm, songName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] p-6 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#EBE7CD]">Confirm Removal</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#EBE7CD]">
            <X size={20} />
          </button>
        </div>
        <p className="text-[#EBE7CD] mb-2">Are you sure you want to remove "{songName}"?</p>
        <p className="text-sm text-gray-400 mb-6">This action will notify the artist.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-[#EBE7CD] rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-[#EBE7CD] rounded hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [adminProfile, setAdminProfile] = useState({ name: '', playlists: 0 });
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [songToRemove, setSongToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [profileData, issuesData] = await Promise.all([
          mockApi.fetchAdminProfile(),
          mockApi.fetchIssues()
        ]);
        setAdminProfile(profileData);
        setIssues(issuesData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveSong = async (songId, songName) => {
    setSongToRemove({ id: songId, name: songName });
    setModalOpen(true);
  };

  const confirmRemoveSong = async () => {
    if (songToRemove) {
      try {
        await mockApi.removeSong(songToRemove.id);
        setIssues(issues.filter(issue => issue.id !== songToRemove.id));
        setModalOpen(false);
        setSongToRemove(null);
      } catch (err) {
        console.error('Error removing song:', err);
        alert('Failed to remove the song. Please try again.');
      }
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212]">
        <Loader className="w-10 h-10 text-green-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-[#EBE7CD] h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-gray-800">
        <button className="mb-8">
          <Menu className="w-6 h-6 text-green-500" />
        </button>
        <div className="space-y-2 mb-auto">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-800 rounded-sm" />
          ))}
        </div>
        <button className="mb-4">
          <PlusCircle className="w-6 h-6 text-gray-500" />
        </button>
        <button>
          <User className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 max-w-4xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] cursor-pointer"
                onClick={handleSearchClick}
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Link to="/homepage" className="flex items-center justify-center w-10 h-10">
              <Home className="w-6 h-6 text-green-500" />
            </Link>
            <button className="flex items-center justify-center w-10 h-10">
              <Settings className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main rectangle */}
        <div className="flex-1 bg-[#1A1A1A] rounded-lg p-6">
          {/* Profile section */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full mr-4" />
              <div>
                <p className="text-sm text-gray-400">Profile</p>
                <h2 className="text-4xl font-bold">{adminProfile.name}</h2>
                <p className="text-sm text-gray-400">{adminProfile.playlists} Playlists</p>
              </div>
            </div>
            <Link to="/useredit" className="flex items-center justify-center w-10 h-10">
              <Edit2 className="w-5 h-5 text-gray-400 hover:text-[#EBE7CD]" />
            </Link>
          </div>

          {/* Issues section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">All Issues</h3>
            <div className="grid grid-cols-1 gap-4">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-[#2A2A2A] p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{issue.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 text-sm text-gray-400">{issue.flags} Flags</span>
                    <button 
                      className="text-gray-400 text-sm hover:text-[#EBE7CD]"
                      onClick={() => handleRemoveSong(issue.id, issue.name)}
                    >
                      Remove Song
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmRemoveSong}
        songName={songToRemove?.name}
      />
    </div>
  );
};

export default Admin;