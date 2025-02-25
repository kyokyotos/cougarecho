import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Disc, X, Music, LogOut } from 'lucide-react';
import axios from '../../api/axios';
import Sidebar from '../../components/sidebar/Sidebar'; // Update this import path as per your project structure

interface Artist {
  artist_id: string;
  name: string;
}

interface Album {
  album_id: string;
  title: string;
  artist_name: string;
  artist_id: string;
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [accountType, setAccountType] = useState('listener');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Homepage';
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get artists
        const artistsResponse = await axios.get(`/artists`);
        if (artistsResponse?.data) {
          const artistsData = await artistsResponse.data
          console.log(artistsData)
          const artistList = artistsData.map(artist => ({
            artist_id: artist.artist_id,
            name: artist.artist_name || ''
          }));
          console.log('Top 3 Artists:', artistList);
          setArtists(artistList);
        }

        // Get albums
        const albumsResponse = await axios(`/albums`);
        if (albumsResponse?.data) {
          const albumsData = await albumsResponse?.data;
          const albumList = albumsData.map(album => ({
            album_id: album.album_id,
            title: album.album_name,
            artist_name: album.artist_name,
            artist_id: album.artist_id
          }));
          console.log('Top 6 Albums:', albumList);
          setAlbums(albumList);
        }

        // Get user type from token
        const token = localStorage.getItem('userToken');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userType = payload.role_id === 1 ? 'listener'
              : payload.role_id === 2 ? 'artist'
                : payload.role_id === 3 ? 'admin'
                  : 'listener';
            setAccountType(userType);
          } catch (tokenError) {
            console.error('Error parsing token:', tokenError);
            setAccountType('listener');
          }
        }
      } catch (err) {
        console.error('Error loading homepage data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProfilePath = () => {
    switch (accountType) {
      case 'artist':
        return '/artist';
      case 'admin':
        return '/admin';
      default:
        return '/listener';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();

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

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="text-[#EBE7CD]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-[#EBE7CD] min-h-screen flex font-sans">
      {/* Sidebar */}
      <Sidebar handleCreatePlaylist={handleCreatePlaylist} handleLogout={() => navigate('/#')} /> 

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
            <Link to={getProfilePath()} className="text-[#1ED760] hover:text-white">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <section>
            <h2 className="text-2xl font-bold mb-4">Explore The New Albums</h2>
            <div className="grid grid-cols-3 gap-4">
              {albums.map((album) => (
                <button
                  key={album.album_id}
                  aria-label={`Explore ${album.title} by ${album.artist_name}`}
                  className="w-full aspect-square bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors flex flex-col items-center justify-center p-4"
                  onClick={() => handleAlbumClick(album.album_id)}
                >
                  <Disc className="w-1/2 h-1/2 text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-center">{album.title}</span>
                  <span className="text-xs text-gray-400 text-center mt-1">{album.artist_name}</span>
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
