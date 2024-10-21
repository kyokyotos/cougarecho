import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Home, Settings, Menu, User, Search, X, PlusCircle, Pause, Music, LogOut } from 'lucide-react';

const AlbumPage = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [album, setAlbum] = useState({
    title: "Hit me hard and soft",
    artist: "Billie Eilish",
    songCount: 10,
    songs: [
      { id: 1, title: "Skinny", plays: 590383201, duration: "3:42" },
      { id: 2, title: "Lunch", plays: 590383201, duration: "3:15" },
      { id: 3, title: "Wildflower", plays: 480293102, duration: "4:01" },
      { id: 4, title: "The Greatest", plays: 520184930, duration: "3:57" },
    ]
  });
  const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState(null);
  const [accountType, setAccountType] = useState('listener'); // Can be 'listener', 'admin', or 'artist'

  useEffect(() => {
    document.title = `${album.title} - ${album.artist}`;
    fetchAccountType();
  }, [album.title, album.artist]);

  const fetchAccountType = () => {
    // This is a mock API call. In a real application, you'd fetch this from your backend
    setTimeout(() => {
      const types = ['listener', 'admin', 'artist'];
      setAccountType(types[Math.floor(Math.random() * types.length)]);
    }, 1000);
  };

  const handleSongClick = (songId) => {
    if (currentlyPlayingSongId === songId) {
      setCurrentlyPlayingSongId(null);
    } else {
      setCurrentlyPlayingSongId(songId);
    }
  };

  const handleCreatePlaylist = () => {
    console.log("Create new playlist");
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
                <User className="w-5 h-5 mr-3" /> Profile ({accountType})
              </Link>
              <button className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4">
                <LogOut className="w-5 h-5 mr-3" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-[#121212] p-4 flex justify-between items-center">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

        {/* Album content */}
        <div className="flex-1 p-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-40 h-40 bg-gray-700 rounded-md"></div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold">{album.title}</h1>
                <p className="text-xl text-pink-400">{album.artist}</p>
                <p className="text-sm text-gray-400">{album.songCount} songs</p>
              </div>
            </div>
            <button className="bg-[#1ED760] rounded-full p-3 mb-6">
              <Play className="w-8 h-8 text-black" fill="black" />
            </button>
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left pb-2">Title</th>
                  <th className="text-right pb-2">Plays</th>
                  <th className="text-right pb-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {album.songs.map((song) => (
                  <tr 
                    key={song.id} 
                    className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleSongClick(song.id)}
                  >
                    <td className="py-3 flex items-center">
                      {currentlyPlayingSongId === song.id ? (
                        <Pause className="w-4 h-4 mr-3 text-[#1ED760]" />
                      ) : (
                        <Play className="w-4 h-4 mr-3 text-gray-400" />
                      )}
                      {song.title}
                    </td>
                    <td className="py-3 text-right text-gray-400">{song.plays.toLocaleString()}</td>
                    <td className="py-3 text-right text-gray-400">{song.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;