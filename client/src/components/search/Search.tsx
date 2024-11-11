import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';
import { Search, Menu, PlusCircle, User, Play } from 'lucide-react';
import MusicPlayer from '../../songplayer/Player';

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

interface SearchResultItem {
  song_id: string;
  song_name: string;
  artist_name: string;
  album_name: string;
  genre_name: string;
  duration: string;
  path: string;
  coverUrl?: string;
  album_id: string;
}

interface SearchResults {
  songs: SearchResultItem[];
  artists: DBArtist[];
}

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<SearchResults>({ songs: [], artists: [] });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState<SearchResultItem | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const searchKeyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchUserId = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const userData = JSON.parse(userJson);
        setUserId(userData.user_id);
      }
    };
    fetchUserId();
  }, []);

  const printDebugInfo = (message: string, data: any) => {
    console.log(message, data);
  };

  const handleSearch = async () => {
    if (searchKeyword.trim() === '') {
      setResults({ songs: [], artists: [] });
      return;
    }

    const token = localStorage.getItem('token') || '';  // Retrieve token from local storage

    try {
      const response = await axios.get(`http://localhost:8080/api/songs/search`, {
        params: { keyword: searchKeyword },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setResults({
        songs: response.data,  // Use response data directly for songs
        artists: []            // Assuming no artist data is fetched in this version
      });
      printDebugInfo("Search results:", response.data);  // Log the results for debugging
      setErrMsg(null);  // Clear error message if request is successful

    } catch (error: any) {
      console.error('Error performing search:', error);
      if (error.response) {
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        console.log('Response data:', error.response.data);

        if (error.response.status === 401) {
          setErrMsg('Unauthorized: Please log in again.');
          navigate('/login');
        } else {
          setErrMsg('Failed to fetch search results.');
        }
      } else {
        setErrMsg('No Server Response');
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchKeyword]);

  const updateSearchParams = (keyword: string) => {
    const params = new URLSearchParams();
    params.set('keyword', keyword);
    navigate({ search: params.toString() });
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const handleSongPlay = (song: SearchResultItem) => {
    setCurrentSong(song);
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
        <div className="mt-auto flex flex-col items-center space-y-4 mb-4">
          <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white" aria-label="Add">
            <PlusCircle className="w-6 h-6" />
          </button>
          <Link to="/useredit" className="text-[#1ED760] hover:text-white">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto pb-20">
        {/* Search bar */}
        <div className="flex items-center mb-8">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => updateSearchParams(e.target.value)}
              placeholder="Search for Song or Artist"
              className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD] focus:outline-none"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchKeyword && (
          <div>
            {results.songs.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-3">Songs</h3>
                <div className="grid grid-cols-1 gap-2">
                  {results.songs.map((song) => (
                    <div
                      key={song.song_id}
                      className="bg-[#2A2A2A] p-3 rounded-lg flex items-center hover:bg-[#3A3A3A] transition-colors"
                      onClick={() => handleSongPlay(song)}
                    >
                      <Play className="w-4 h-4 mr-3 text-gray-400" />
                      <div className="flex-grow">
                        <p className="font-semibold">{song.song_name}</p>
                        <p className="text-sm text-gray-400">Artist: {song.artist_name}</p>
                        <p className="text-sm text-gray-400">Album: {song.album_name}</p>
                      </div>
                      <p className="text-sm text-gray-400">{formatDuration(song.duration)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
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
            coverUrl: `/api/albums/${currentSong.album_id}/cover`,
            audioUrl: `/api/songs/${currentSong.song_id}/stream`
          }}
          userId={userId}
        />
      )}
    </div>
  );
};

export default SearchPage;
