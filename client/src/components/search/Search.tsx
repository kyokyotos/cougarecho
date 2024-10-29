import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Play, X, Music, LogOut } from 'lucide-react';
import Player from './components/songplayer/Player';

// Database-aligned interfaces
interface DBSong {
  song_id: string;
  path: string;
  song_name: string;
  duration: string;
  plays: number;
  album_id: string;
  artist_id: string;
  genre_id: string;
  created_at: string;
  isAvailable: boolean;
}

interface DBArtist {
  artist_id: string;
  artist_name: string;
  country?: string;
  bio?: string;
  created_at: string;
  user_id: string;
  isVerified: boolean;
}

interface DBAlbum {
  album_id: string;
  album_name: string;
  create_at: string;
  path: string;
  artist_id: string;
}

interface DBGenre {
  genre_id: string;
  genre_name: string;
}

// Combined interface for display
interface SearchResultItem {
  song_id: string;
  song_name: string;
  artist_name: string;
  album_name: string;
  genre_name: string;
  duration: string;
  path: string;
  coverUrl?: string;
}

interface SearchResults {
  songs: SearchResultItem[];
  artists: DBArtist[];
}

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<SearchResults>({ songs: [], artists: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState<SearchResultItem | null>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get userId from your auth system
    const fetchUserId = async () => {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUserId(userData.user_id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  const searchKeyword = searchParams.get('keyword') || '';
  const searchType = searchParams.get('type') || 'all';

  const handleSearch = async () => {
    if (searchKeyword.trim() === '') {
      setResults({ songs: [], artists: [] });
      return;
    }

    try {
      // Make the search request to your API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: searchKeyword,
          type: searchType
        })
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();

      // Transform the data to match our display interface
      const processedSongs: SearchResultItem[] = data.songs.map((song: DBSong & { 
        artist: DBArtist, 
        album: DBAlbum,
        genre: DBGenre 
      }) => ({
        song_id: song.song_id,
        song_name: song.song_name,
        artist_name: song.artist.artist_name,
        album_name: song.album.album_name,
        genre_name: song.genre.genre_name,
        duration: song.duration,
        path: song.path,
        coverUrl: `${import.meta.env.VITE_API_URL}/api/albums/${song.album_id}/cover`
      }));

      setResults({
        songs: processedSongs,
        artists: data.artists || []
      });

    } catch (error) {
      console.error('Error performing search:', error);
      // You might want to show an error message to the user here
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

  const handleSongPlay = async (song: SearchResultItem) => {
    // First, record the play in SongPlayHistory
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/songs/${song.song_id}/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId
        })
      });

      // Update plays count in Songs table
      await fetch(`${import.meta.env.VITE_API_URL}/api/songs/${song.song_id}/increment-plays`, {
        method: 'POST'
      });

      // Set the current song for the player
      setCurrentSong(song);

    } catch (error) {
      console.error('Error recording song play:', error);
    }
  };

  const handleCreatePlaylist = () => {
    navigate('/newplaylist');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/#');
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#121212] text-[#EBE7CD] min-h-screen flex font-sans relative">
      {/* Sidebar */}
      <div className={`w-16 flex flex-col items-center py-4 bg-black border-r border-gray-800 transition-all duration-300 ease-in-out ${isMenuExpanded ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button onClick={() => setIsMenuExpanded(!isMenuExpanded)} className="text-[#1ED760] hover:text-white" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto flex flex-col items-center space-y-4 mb-4">
          <button onClick={handleCreatePlaylist} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:text-white" aria-label="Add">
            <PlusCircle className="w-6 h-6 text-white" />
          </button>
          <Link to="/useredit" aria-label="User Profile" className="text-[#1ED760] hover:text-white">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto pb-20">
        {/* Search bar */}
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
        </div>

        {/* Search Results */}
        {searchKeyword && (
          <div>
            {results.songs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Songs</h3>
                <div className="grid grid-cols-1 gap-2">
                  {results.songs.map((song) => (
                    <div 
                      key={song.song_id} 
                      className="bg-[#2A2A2A] p-3 rounded-lg flex items-center cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                      onClick={() => handleSongPlay(song)}
                    >
                      <Play className="w-4 h-4 mr-3 text-gray-400" />
                      <div className="flex-grow">
                        <p className="font-semibold">{song.song_name}</p>
                        <p className="text-sm text-gray-400">Artist: {song.artist_name}</p>
                        <p className="text-sm text-gray-400">Album: {song.album_name}</p>
                        <p className="text-sm text-gray-400">Genre: {song.genre_name}</p>
                      </div>
                      <p className="text-sm text-gray-400">{formatDuration(song.duration)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.songs.length === 0 && (
              <p className="text-center text-gray-400">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Music Player */}
      {currentSong && (
        <MusicPlayer
          currentSong={{
            id: currentSong.song_id,
            title: currentSong.song_name,
            artist: currentSong.artist_name,
            coverUrl: currentSong.coverUrl,
            audioUrl: `${import.meta.env.VITE_API_URL}/api/songs/${currentSong.song_id}/stream`
          }}
          userId={userId}
        />
      )}
    </div>
  );
};

export default SearchPage;