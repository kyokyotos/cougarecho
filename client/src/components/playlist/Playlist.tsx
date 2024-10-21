import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, Pause, Edit2, Check, X, Music, LogOut, Image as ImageIcon } from 'lucide-react';

// Mock API for fetching playlist data and songs
const mockApi = {
  fetchPlaylistData: () => Promise.resolve({
    name: 'Fall Romcom',
    creator: 'anailemone',
    songCount: 10,
    image: null,
    songs: [
      { id: 1, title: 'Skinny', artist: 'Billie Eilish', dateAdded: '2024-05-15T14:30:00Z', duration: 195 },
      { id: 2, title: 'Juna', artist: 'Ciaro', dateAdded: '2024-05-29T09:45:00Z', duration: 215 },
    ]
  }),
  searchSongs: (query) => Promise.resolve([
    { id: 3, title: 'New Song', artist: 'New Artist', duration: 260 },
    { id: 4, title: 'Another Track', artist: 'Cool Band', duration: 175 },
  ])
};

const PlaylistPage = () => {
  const [playlistData, setPlaylistData] = useState({ name: '', creator: '', songCount: 0, image: null, songs: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [playingSongId, setPlayingSongId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await mockApi.fetchPlaylistData();
      setPlaylistData(data);
      setEditedName(data.name);
    };
    fetchData();

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    } else {
      navigate('/playlist', { replace: true });
    }
  };

  const handleEditName = () => {
    setPlaylistData({ ...playlistData, name: editedName });
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlaylistData({ ...playlistData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSong = () => {
    setIsAddingSong(true);
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
    const now = new Date().toISOString();
    setPlaylistData({
      ...playlistData,
      songs: [...playlistData.songs, { ...song, dateAdded: now }],
      songCount: playlistData.songCount + 1
    });
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCreatePlaylist = () => {
    console.log("Create new playlist");
  };

  const togglePlayPause = (songId) => {
    if (playingSongId === songId) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(songId);
    }
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

        {/* Playlist content */}
        <div className="flex-1 bg-[#1A1A1A] rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-40 h-40 bg-[#2A2A2A] rounded-lg mr-6 relative overflow-hidden">
              {playlistData.image ? (
                <img src={playlistData.image} alt="Playlist cover" className="w-full h-full object-cover" />
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
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-4xl font-bold bg-[#2A2A2A] text-[#EBE7CD] rounded px-2 py-1 mr-2"
                  />
                  <button onClick={handleEditName} className="text-[#1ED760]">
                    <Check className="w-6 h-6" />
                  </button>
                  <button onClick={() => setIsEditing(false)} className="text-red-500 ml-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <h2 className="text-4xl font-bold mb-2 flex items-center">
                  {playlistData.name}
                  <button onClick={() => setIsEditing(true)} className="ml-2 text-gray-400 hover:text-white">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </h2>
              )}
              <Link to={`/user/${playlistData.creator}`} className="text-[#A0616A] hover:underline">
                {playlistData.creator}
              </Link>
              <p className="text-sm text-[#EBE7CD] opacity-75 mt-1">{playlistData.songCount} songs</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-4 text-sm font-bold text-[#EBE7CD] opacity-75 mb-2">
              <span></span>
              <span>Title</span>
              <span>Date Added</span>
              <span>Time</span>
            </div>
            {playlistData.songs.map((song) => (
              <div key={song.id} className="grid grid-cols-4 text-sm py-2 hover:bg-[#2A2A2A] rounded items-center">
                <button onClick={() => togglePlayPause(song.id)} className="text-[#1ED760] hover:text-white">
                  {playingSongId === song.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <span>{song.title} - {song.artist}</span>
                <span>{formatDateAdded(song.dateAdded)}</span>
                <span>{formatDuration(song.duration)}</span>
              </div>
            ))}
          </div>

          {isAddingSong ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Add a song:</h3>
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
              <button
              onClick={() => setIsAddingSong(false)}
              className="mt-2 text-[#EBE7CD] hover:text-[#1ED760]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddSong}
            className="bg-[#2A2A2A] text-[#EBE7CD] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#3A3A3A] transition-colors"
          >
            Add Song
          </button>
        )}
      </div>
    </div>
  </div>
);
};

export default PlaylistPage;