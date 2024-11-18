import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Edit2, Loader, X, Music, LogOut, Users, Mic, Music2 } from 'lucide-react';
import Photo from '../photo/Photo';

const Admin = () => {
  const [adminProfile, setAdminProfile] = useState({ name: '', playlists: 0 });
  const [activityStats, setActivityStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalSongs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showReportDropdown, setShowReportDropdown] = useState(false);

  const navigate = useNavigate();

  // Fetch admin profile
  const fetchAdminProfile = async () => {
    const response = await fetch('http://localhost:8080/api/admin-profile');
    if (!response.ok) {
      throw new Error('Failed to fetch admin profile');
    }
    return response.json();
  };

  // Fetch activity stats
  const fetchActivityStats = async () => {
    const response = await fetch('http://localhost:8080/api/activity-stats');
    if (!response.ok) {
      throw new Error('Failed to fetch activity stats');
    }
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [profileData, statsData] = await Promise.all([
          fetchAdminProfile(),
          fetchActivityStats(),
        ]);
        setAdminProfile(profileData || { name: '', playlists: 0 });
        setActivityStats(statsData || { totalUsers: 0, totalArtists: 0, totalSongs: 0 });
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/#', {
      state: {
        showLogoutMessage: true,
        message: "You've been logged out successfully",
      },
    });
  };

  const handleCreatePlaylist = () => {
    navigate('/newplaylist');
  };

  const handleActivityTracking = () => {
    navigate('/tracking');
  };

  const handleGenerateReport = (type) => {
    console.log(`Generating ${type} report...`);
    setShowReportDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length > 0) {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    } else {
      navigate('/admin', { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212]">
        <Loader className="w-10 h-10 text-[#1ED760] animate-spin" />
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
    <div className="bg-[#121212] text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className={`w-16 flex flex-col items-center py-4 bg-black border-r border-gray-800 transition-all duration-300 ease-in-out ${isMenuExpanded ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} className="text-[#1ED760] hover:text-white" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow space-y-4">
          <Link to="/homepage" aria-label="Home" className="text-[#1ED760] hover:text-white">
            <Home className="w-6 h-6" />
          </Link>
          <Link to="/search" aria-label="Search" className="text-[#1ED760] hover:text-white">
            <Search className="w-6 h-6" />
          </Link>
          <Link to="/library" aria-label="Library" className="text-[#1ED760] hover:text-white">
            <Music className="w-6 h-6" />
          </Link>
        </div>
        <div className="mt-auto flex flex-col items-center space-y-4 mb-4">
          <button onClick={handleCreatePlaylist} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-[#EBE7CD] hover:text-white" aria-label="Add">
            <PlusCircle className="w-6 h-6" />
          </button>
          <Link to="/useredit" aria-label="User Profile" className="text-[#1ED760] hover:text-white">
            <User className="w-6 h-6" />
          </Link>
          <button onClick={handleLogout} className="text-[#1ED760] hover:text-white" aria-label="Logout">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-white"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/homepage" className="text-[#1ED760] hover:text-white">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/useredit" className="text-[#1ED760] hover:text-white">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Profile section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Photo />
              <div>
                <p className="text-sm text-gray-400">Profile</p>
                <h2 className="text-4xl font-bold">{adminProfile.name}</h2>
                <p className="text-sm text-gray-400">{adminProfile.playlists} Playlists</p>
              </div>
            </div>
            <Link to="/useredit" className="text-gray-400 hover:text-white">
              <Edit2 className="w-5 h-5" />
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <div className="relative report-dropdown">
              <button
                onClick={() => setShowReportDropdown(!showReportDropdown)}
                className="bg-[#1ED760] hover:bg-[#1db954] text-black font-semibold py-3 px-6 rounded-full transition-colors duration-200"
              >
                Generate Reports
              </button>
              {showReportDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#2A2A2A] rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => handleGenerateReport('song')}
                    className="w-full px-4 py-2 text-left text-[#EBE7CD] hover:bg-[#3A3A3A] transition-colors"
                  >
                    Song Report
                  </button>
                  <button
                    onClick={() => handleGenerateReport('user')}
                    className="w-full px-4 py-2 text-left text-[#EBE7CD] hover:bg-[#3A3A3A] transition-colors"
                  >
                    User Report
                  </button>
                  <button
                    onClick={() => handleGenerateReport('artist')}
                    className="w-full px-4 py-2 text-left text-[#EBE7CD] hover:bg-[#3A3A3A] transition-colors"
                  >
                    Artist Report
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleActivityTracking}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#EBE7CD] font-semibold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Activity Tracking System
            </button>
            <button
              onClick={() => navigate('/makeadmin')}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#EBE7CD] font-semibold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Make Admin
            </button>
          </div>
        </div>

        {/* Activity Stats */}
        <div>
          <h3 className="text-xl font-bold mb-4">Platform Activity</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="w-6 h-6 mr-2 text-[#1ED760]" />
                <span className="text-lg font-semibold">Total Listeners</span>
              </div>
              <p className="text-3xl font-bold text-[#1ED760]">{activityStats.totalUsers?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <Mic className="w-6 h-6 mr-2 text-[#1ED760]" />
                <span className="text-lg font-semibold">Total Artists</span>
              </div>
              <p className="text-3xl font-bold text-[#1ED760]">{activityStats.totalArtists?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <Music2 className="w-6 h-6 mr-2 text-[#1ED760]" />
                <span className="text-lg font-semibold">Songs Uploaded</span>
              </div>
              <p className="text-3xl font-bold text-[#1ED760]">{activityStats.totalSongs?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
