import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, Settings, Menu, PlusCircle, User, Disc, X, Music, LogOut } from 'lucide-react';

const API_URL = 'http://localhost:8080';

interface Artist {
  artist_id: string;
  name: string;        
  bio?: string;
  imageUrl?: string;   
}

interface Album {
  album_id: string;
  title: string;      
  artist_name: string;
  artist_id: string;
  cover_url?: string;  
}

const api = {
  fetchArtists: async (): Promise<Artist[]> => {
    try {
      const response = await fetch(`${API_URL}/api/artists`);
      if (!response.ok) throw new Error('Failed to fetch artists');
      const data = await response.json();
      return data.map((artist: any) => ({
        artist_id: artist.artist_id.toString(),
        name: artist.name,
        bio: artist.bio,
        imageUrl: artist.imageUrl
      }));
    } catch (error) {
      console.error('Error fetching artists:', error);
      return [];
    }
  },

  fetchAlbums: async (): Promise<Album[]> => {
    try {
      const response = await fetch(`${API_URL}/api/albums`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      const data = await response.json();
      return data.map((album: any) => ({
        album_id: album.album_id.toString(),
        title: album.title,
        artist_name: album.artist_name,
        artist_id: album.artist_id.toString(),
        cover_url: album.cover_url
      }));
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  fetchUserType: async (): Promise<string> => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return 'listener';

      const response = await fetch(`${API_URL}/api/user/type`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user type');
      const data = await response.json();
      return data.accountType;
    } catch (error) {
      console.error('Error fetching user type:', error);
      return 'listener';
    }
  }
};

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [accountType, setAccountType] = useState('listener');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    document.title = 'Homepage';
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [artistsData, albumsData, userType] = await Promise.all([
          api.fetchArtists(),
          api.fetchAlbums(),
          api.fetchUserType()
        ]);

        setArtists(artistsData);
        setAlbums(albumsData);
        setAccountType(userType);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error loading homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    navigate(`/artistpage/${artistId}`);  // Updated to match your route structure
  };

  const handleAlbumClick = (albumId: string) => {
    navigate(`/albumpage/${albumId}`);  // Updated to match your route structure
    console.log('Navigating to album:', albumId); // Add this to debug
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
          <Link to={getProfilePath()} aria-label="User Profile" className="text-[#1ED760] hover:text-white">
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
            <Link to={getProfilePath()} className="text-[#1ED760] hover:text-white">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Explore New Artists</h2>
            <div className="grid grid-cols-4 gap-4">
              {artists.map((artist) => (
                <button
                  key={artist.artist_id}
                  aria-label={`Explore ${artist.name}`}
                  className="w-full aspect-square bg-[#2A2A2A] rounded-full flex flex-col items-center justify-center hover:bg-[#3A3A3A] transition-colors"
                  onClick={() => handleArtistClick(artist.artist_id)}
                >
                  {artist.imageUrl ? (
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name} 
                      className="w-1/2 h-1/2 rounded-full object-cover mb-2"
                    />
                  ) : (
                    <User className="w-1/2 h-1/2 text-gray-400 mb-2" />
                  )}
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
                  key={album.album_id}
                  aria-label={`Explore ${album.title} by ${album.artist_name}`}
                  className="w-full aspect-square bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors flex flex-col items-center justify-center p-4"
                  onClick={() => handleAlbumClick(album.album_id)}
                >
                  {album.cover_url ? (
                    <img 
                      src={album.cover_url} 
                      alt={album.title} 
                      className="w-1/2 h-1/2 object-cover mb-2 rounded"
                    />
                  ) : (
                    <Disc className="w-1/2 h-1/2 text-gray-400 mb-2" />
                  )}
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