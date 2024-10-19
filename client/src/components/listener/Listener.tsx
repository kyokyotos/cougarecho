import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, User, Edit2 } from 'lucide-react';

// Mock API (unchanged)
const mockApi = {
  fetchUserProfile: () => new Promise<{ name: string; playlists: number }>(resolve => 
    setTimeout(() => resolve({ name: 'anailemone', playlists: 70 }), 500)
  ),
  fetchPlaylists: () => new Promise<Array<{ id: number; name: string; imageUrl: string }>>(resolve => 
    setTimeout(() => resolve([
      { id: 1, name: 'My Playlist 1', imageUrl: '/api/placeholder/120/120' },
      { id: 2, name: 'My Playlist 2', imageUrl: '/api/placeholder/120/120' },
      { id: 3, name: 'My Playlist 3', imageUrl: '/api/placeholder/120/120' },
    ]), 500)
  ),
};

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<{ name: string; playlists: number }>({ name: '', playlists: 0 });
  const [playlists, setPlaylists] = useState<Array<{ id: number; name: string; imageUrl: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [profileData, playlistsData] = await Promise.all([
          mockApi.fetchUserProfile(),
          mockApi.fetchPlaylists()
        ]);
        setUserProfile(profileData);
        setPlaylists(playlistsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleSettingsClick = () => {
    navigate('/useredit');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-10 h-10 border-t-2 border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 bg-black border-r border-gray-800">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button className="text-[#1ED760] hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-800 rounded-sm"></div>
          ))}
        </div>
        <button className="mt-auto mb-4 text-[#EBE7CD] hover:text-white">
          <User className="w-6 h-6" />
        </button>
        <button className="mb-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-[#EBE7CD] hover:text-white">
          <span className="text-2xl">+</span>
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
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                onClick={handleSearchClick}
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-[#1ED760] hover:text-white">
              <Home className="w-6 h-6" />
            </button>
            <button className="text-[#1ED760] hover:text-white" onClick={handleSettingsClick}>
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8 relative">
          <div className="flex items-start mb-4">
            <div className="w-32 h-32 bg-gray-700 rounded-full mr-6"></div>
            <div>
              <p className="text-sm text-gray-400">Profile</p>
              <h2 className="text-4xl font-bold">{userProfile.name}</h2>
              <p className="text-sm text-gray-400">{userProfile.playlists} Playlists</p>
            </div>
          </div>
          <button className="absolute top-4 right-4 text-[#EBE7CD] hover:text-white">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* Playlists section */}
        <div>
          <h3 className="text-xl font-bold mb-4">All Playlists</h3>
          <div className="grid grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-[#2A2A2A] rounded-lg aspect-square">
                <img src={playlist.imageUrl} alt={playlist.name} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;