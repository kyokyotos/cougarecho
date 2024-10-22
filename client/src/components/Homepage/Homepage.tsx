import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Disc, X, Music, LogOut } from 'lucide-react';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [accountType, setAccountType] = useState('listener'); // Can be 'listener', 'admin', or 'artist'

  const getProfilePath = () => {
    switch (accountType) {
      case 'artist':
        return '/artistprofile';
      case 'admin':
        return '/adminprofile';
      default:
        return '/userprofile';
    }
  };

  useEffect(() => {
    document.title = 'Homepage';
    fetchAccountType();
  }, []);

  const fetchAccountType = () => {
    // This is a mock API call. In a real application, you'd fetch this from your backend
    setTimeout(() => {
      const types = ['listener', 'admin', 'artist'];
      setAccountType(types[Math.floor(Math.random() * types.length)]);
    }, 1000);
  };

  const handleLogout = () => {
    // Clear any auth tokens or user data
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    
    // Navigate to login with logout message
    navigate('/#', { 
      state: { 
        showLogoutMessage: true,
        message: "You've been logged out successfully" 
      } 
    });
  };

  const handleCreatePlaylist = () => {
    navigate('/newplaylist');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleArtistClick = (artistId: number) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumClick = (albumId: number) => {
    navigate(`/album/${albumId}`);
  };

  // Placeholder data (replace with real data in production)
  const artists = [
    { id: 1, name: "The Melodics" },
    { id: 2, name: "Rhythm Collective" },
    { id: 3, name: "Harmony Heights" },
    { id: 4, name: "Sonic Waves" }
  ];

  const albums = [
    { id: 1, name: "Echoes of Dawn", artist: "The Melodics" },
    { id: 2, name: "Urban Rhythms", artist: "Rhythm Collective" },
    { id: 3, name: "Celestial Harmonies", artist: "Harmony Heights" }
  ];

  return (
    <div className="bg-[#121212] text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className={`w-16 flex flex-col items-center py-4 bg-black border-r border-gray-800 transition-all duration-300 ease-in-out ${isMenuExpanded ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} className="text-[#1ED760] hover:text-white" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto flex flex-col items-center space-y-4 mb-4">
          <button onClick={handleCreatePlaylist} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-[#EBE7CD] hover:text-white" aria-label="Add">
            <PlusCircle className="w-6 h-6" />
          </button>
          <Link to={getProfilePath()} aria-label="User Profile" className="text-[#1ED760] hover:text-white"><User className="w-6 h-6" /></Link>
        </div>
      </div>

      {/* Expandable Menu */}
      {isMenuExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-[#121212] w-64 h-full p-4">
            <button onClick={() => setIsMenuExpanded(false)} className="mb-8 text-[#1ED760]">
              <X className="w-6 h-6" />
            </button>
            <nav>
              <ul className="space-y-4">
                <li><Link to="/homepage" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center"><Home className="w-5 h-5 mr-3" /> Home</Link></li>
                <li><Link to="/search" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center"><Search className="w-5 h-5 mr-3" /> Search</Link></li>
                <li><Link to="/userlibrary" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center"><Music className="w-5 h-5 mr-3" /> Your Library</Link></li>
                <li><button onClick={handleCreatePlaylist} className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center w-full"><PlusCircle className="w-5 h-5 mr-3" /> Create Playlist</button></li>
              </ul>
            </nav>
            <div className="mt-auto">
              <Link to={getProfilePath()} className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4">
                <User className="w-5 h-5 mr-3" /> Profile ({accountType})
              </Link>
              <button 
                onClick={handleLogout}
                className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4 w-full"
              >
                <LogOut className="w-5 h-5 mr-3" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-[#121212] p-4 flex justify-between items-center">
          <div className="flex-1 max-w-xl">
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
            <Link to="/homepage" className="text-[#1ED760] hover:text-white">
              <Home className="w-6 h-6" />
            </Link>
            <Link to={getProfilePath()} className="text-[#1ED760] hover:text-white"><Settings className="w-6 h-6" /></Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Explore New Artists</h2>
            <div className="grid grid-cols-4 gap-4">
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  aria-label={`Explore ${artist.name}`}
                  className="w-full aspect-square bg-[#2A2A2A] rounded-full flex flex-col items-center justify-center hover:bg-[#3A3A3A] transition-colors"
                  onClick={() => handleArtistClick(artist.id)}
                >
                  <User className="w-1/2 h-1/2 text-gray-400 mb-2" />
                  <span className="text-sm text-center px-2">{artist.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Explore New Albums</h2>
            <div className="grid grid-cols-3 gap-4">
              {albums.map((album) => (
                <button
                  key={album.id}
                  aria-label={`Explore ${album.name} by ${album.artist}`}
                  className="w-full aspect-square bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors flex flex-col items-center justify-center p-4"
                  onClick={() => handleAlbumClick(album.id)}
                >
                  <Disc className="w-1/2 h-1/2 text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-center">{album.name}</span>
                  <span className="text-xs text-gray-400 text-center mt-1">{album.artist}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage;