import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, X, Music, LogOut } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  plays: string;
  duration: string;
}

const ArtistProfilePage: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const navigate = useNavigate();

  const songs: Song[] = [
    { id: '1', title: 'Santa', plays: '600,126,349', duration: '3:26' },
    { id: '2', title: 'Diluvio', plays: '500,125,196', duration: '3:46' },
    { id: '3', title: 'Dile a él', plays: '400,125,196', duration: '3:15' },
  ];

  const handleCreatePlaylist = () => {
    navigate('/newplaylist');
  };

  const handleLogout = () => {
    navigate('/#');
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
                <li><Link to="/newplaylist" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center"><PlusCircle className="w-5 h-5 mr-3" /> Create Playlist</Link></li>
              </ul>
            </nav>
            <div className="mt-auto">
              <Link to="/useredit" className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4">
                <User className="w-5 h-5 mr-3" /> Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="text-[#EBE7CD] hover:text-[#1ED760] flex items-center mt-4"
              >
                <LogOut className="w-5 h-5 mr-3" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="flex justify-end p-4 space-x-4">
          <Link to="/homepage" className="text-[#1ED760] hover:text-white">
            <Home className="w-6 h-6" />
          </Link>
          <Link to="/useredit" className="text-[#1ED760] hover:text-white">
            <Settings className="w-6 h-6" />
          </Link>
        </div>

        {/* First Rectangle */}
        <div className="p-8">
          <div className="bg-[#1A1A1A] rounded-lg p-8">
            {/* Artist Info */}
            <div className="flex items-center space-x-6 mb-8">
              <img 
                src="/path-to-artist-image.jpg"
                alt="Rauw Alejandro"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">Rauw Alejandro</h1>
                <button className="bg-[#1ED760] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#1db954] transition-colors">
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Rectangle */}
        <div className="px-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            {/* Songs */}
            <div className="space-y-2">
              {songs.map((song) => (
                <div 
                  key={song.id}
                  className="group flex items-center justify-between p-3 rounded-md hover:bg-[#282828] transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Play className="w-5 h-5 text-[#1ED760] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-sm text-gray-400">{song.plays} plays</p>
                    </div>
                  </div>
                  <span className="text-gray-400">{song.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Albums Section at Bottom */}
        <div className="px-8 mt-8">
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div 
                key={index}
                className="bg-[#282828] p-4 rounded-lg cursor-pointer hover:bg-[#3E3E3E] transition-colors"
                onClick={() => navigate(`/album/${index}`)}
              >
                <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4"></div>
                <h3 className="font-semibold">Album {index}</h3>
                <p className="text-sm text-gray-400">2024</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;