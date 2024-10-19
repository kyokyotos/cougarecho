import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User } from 'lucide-react';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleArtistClick = (artistId: number) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumClick = (albumId: number) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="bg-[#121212] text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-gray-800">
        <button aria-label="Menu" className="mb-8">
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <div className="space-y-2 mb-auto">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-800 rounded-sm" />
          ))}
        </div>
        <button aria-label="Add" className="mb-4">
          <PlusCircle className="w-6 h-6 text-gray-400" />
        </button>
        <button aria-label="User Profile">
          <User className="w-6 h-6 text-green-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-4xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 cursor-pointer"
                onClick={handleSearchClick}
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <button aria-label="Home">
              <Home className="w-6 h-6 text-gray-400" />
            </button>
            <button aria-label="Settings">
              <Settings className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#FAF5CE]">Explore New Artists</h2>
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  aria-label={`Explore Artist ${i}`}
                  className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  onClick={() => handleArtistClick(i)}
                >
                  <User className="w-10 h-10 text-gray-700" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-[#FAF5CE]">Explore New Albums</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  aria-label={`Explore Album ${i}`}
                  className="aspect-square bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => handleAlbumClick(i)}
                >
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