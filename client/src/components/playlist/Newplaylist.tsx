import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, Edit2, X, Music, LogOut, Image as ImageIcon } from 'lucide-react';

// Mock API for database operations
const mockApi = {
  searchSongs: (query) => Promise.resolve([
    { id: 1, title: 'Song 1', artist: 'Artist 1', duration: 180 },
    { id: 2, title: 'Song 2', artist: 'Artist 2', duration: 210 },
    { id: 3, title: 'New Song', artist: 'New Artist', duration: 260 },
    { id: 4, title: 'Another Track', artist: 'Cool Band', duration: 175 },
  ]),
  createPlaylist: (playlistData) => Promise.resolve({ id: 1, ...playlistData }),
};

const CreatePlaylistPage = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistImage, setPlaylistImage] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulating authentication check
      const loggedInUser = { username: 'currentUser' };
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlaylistImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchSongs = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await mockApi.searchSongs(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addSongToPlaylist = (song) => {
    setSelectedSongs([...selectedSongs, { ...song, dateAdded: new Date().toISOString() }]);
    setSearchResults(searchResults.filter(s => s.id !== song.id));
  };

  const removeSongFromPlaylist = (song) => {
    setSelectedSongs(selectedSongs.filter(s => s.id !== song.id));
  };

  const handleCreatePlaylist = async () => {
    if (!playlistTitle.trim()) {
      setError('Please enter a playlist title');
      return;
    }
    setError('');
    const playlistData = {
      name: playlistTitle,
      image: playlistImage,
      songs: selectedSongs,
      creator: user?.username,
      songCount: selectedSongs.length,
      dateCreated: new Date().toISOString(),
    };
    await mockApi.createPlaylist(playlistData);
    navigate('/userlibrary');
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDateAdded = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

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
          <Link to="/useredit" aria-label="User Profile" className="text-[#1ED760] hover:text-white">
            <User className="w-6 h-6" />
          </Link>
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
                <li><button onClick={handleCreatePlaylist} className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center"><PlusCircle className="w-5 h-5 mr-3" /> Create Playlist</button></li>
              </ul>
            </nav>
            <div className="mt-auto">
              <Link to="/useredit" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4">
                <User className="w-5 h-5 mr-3" /> Profile
              </Link>
              <button className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4">
                <LogOut className="w-5 h-5 mr-3" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}

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
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-white"
                value={searchQuery}
                onChange={(e) => handleSearchSongs(e.target.value)}
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

        {/* Playlist content */}
        <div className="flex-1 bg-[#1A1A1A] rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-40 h-40 bg-[#2A2A2A] rounded-lg mr-6 relative overflow-hidden">
              {playlistImage ? (
                <img src={playlistImage} alt="Playlist cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-[#EBE7CD] opacity-50" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={playlistTitle}
                onChange={(e) => setPlaylistTitle(e.target.value)}
                className="text-4xl font-bold bg-transparent border-b border-[#EBE7CD] text-[#EBE7CD] w-full focus:outline-none focus:border-[#1ED760]"
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <p className="text-sm text-[#A0616A] mt-2">by {user?.username}</p>
              <p className="text-sm text-[#EBE7CD] opacity-75 mt-1">{selectedSongs.length} songs</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-4 text-sm font-bold text-[#EBE7CD] opacity-75 mb-2">
              <span></span>
              <span>Title</span>
              <span>Date Added</span>
              <span>Time</span>
            </div>
            {selectedSongs.map((song) => (
              <div key={song.id} className="grid grid-cols-4 text-sm py-2 hover:bg-[#2A2A2A] rounded items-center">
                <button className="text-[#1ED760] hover:text-white">
                  <Play className="w-5 h-5" />
                </button>
                <span>{song.title} - {song.artist}</span>
                <span>{formatDateAdded(song.dateAdded)}</span>
                <span>{formatDuration(song.duration)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Add Songs</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchSongs(e.target.value)}
                placeholder="Search for songs"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-[#1ED760]"
              />
            </div>
            {searchResults.map((song) => (
              <div key={song.id} className="flex justify-between items-center py-2 hover:bg-[#2A2A2A] rounded">
                <span>{song.title} - {song.artist}</span>
                <button
                  onClick={() => addSongToPlaylist(song)}
                  className="bg-[#1ED760] text-black px-3 py-1 rounded-full text-sm"
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreatePlaylist}
            className="mt-6 bg-[#1ED760] text-black px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#1DB954] transition-colors"
          >
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;