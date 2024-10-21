import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, X, Music, LogOut } from 'lucide-react';

interface MusicItem {
  title: string;
  artist: string;
  id?: string;
}

interface SearchResults {
  music: MusicItem[];
  artists: MusicItem[];
}

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<SearchResults>({ music: [], artists: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<MusicItem[]>([
    { title: 'TBH', artist: 'PartyNextDoor', id: '1' },
    { title: 'Gasoline', artist: 'The Weeknd', id: '2' },
    { title: 'Too Fast', artist: 'Sonder', id: '3' },
  ]);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const searchKeyword = searchParams.get('keyword') || '';
  const searchType = searchParams.get('type') || 'all';

  const handleSearch = async () => {
    if (searchKeyword.trim() === '') {
      setResults({ music: [], artists: [] });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/search?keyword=${searchKeyword}&type=${searchType}`);
      const data = await response.json();
      setResults({
        music: data.music.map((item: MusicItem, index: number) => ({ ...item, id: `song-${index}` })),
        artists: data.artists.map((item: MusicItem, index: number) => ({ ...item, id: `artist-${index}` }))
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchKeyword, searchType]);

  const updateSearchParams = (keyword: string, type: string) => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (type) params.set('type', type);
    navigate({ search: params.toString() });
  };

  const handleSongClick = (songId: string) => {
    console.log(`Navigating to song with id: ${songId}`);
    // navigate(`/song/${songId}`);
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
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => updateSearchParams(e.target.value, searchType)}
                placeholder="Search for Song or Artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none focus:ring-2 focus:ring-white"
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

        {/* Recent Searches */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
          <div className="grid grid-cols-3 gap-4">
            {recentSearches.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#2A2A2A] p-4 rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                onClick={() => handleSongClick(item.id!)}
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-400">{item.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchKeyword && (
          <div>
            {(searchType === 'all' || searchType === 'music') && results.music.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Songs</h3>
                <div className="grid grid-cols-1 gap-2">
                  {results.music.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-[#2A2A2A] p-3 rounded-lg flex items-center cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                      onClick={() => handleSongClick(item.id!)}
                    >
                      <Play className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(searchType === 'all' || searchType === 'artist') && results.artists.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Artists</h3>
                <div className="grid grid-cols-1 gap-2">
                  {results.artists.map((item) => (
                    <div key={item.id} className="bg-[#2A2A2A] p-3 rounded-lg">
                      <p className="font-semibold">{item.artist}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.music.length === 0 && results.artists.length === 0 && (
              <p className="text-center text-gray-400">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;