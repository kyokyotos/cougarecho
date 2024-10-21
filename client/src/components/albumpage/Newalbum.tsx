import React, { useState, useRef } from 'react';
import { Search, Home, Settings, Menu, User, PlusCircle, X, Music, LogOut, Upload, Image as ImageIcon, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UploadedAlbum {
  name: string;
  songCount: number;
  streams: number;
  likesSaves: number;
  revenue: number;
}

interface AlbumInfo {
  title: string;
  coverImage: File | null;
  songs: string[];
}

const UploadPage: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [songs, setSongs] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [uploadedAlbum, setUploadedAlbum] = useState<UploadedAlbum>({
    name: '',
    songCount: 0,
    streams: 0,
    likesSaves: 0,
    revenue: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleCreatePlaylist = (): void => {
    console.log("Create new playlist");
  };

  const handleAlbumCoverUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAlbumCover(file);
    } else {
      setMessage('Please upload a valid image file.');
    }
  };

  const handleSongUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      const mp3Files = Array.from(files).filter(file => file.type === 'audio/mpeg');
      if (mp3Files.length !== files.length) {
        setMessage('Please upload only MP3 files.');
      }
      setSongs(prevSongs => [...prevSongs, ...mp3Files]);
    }
  };

  const simulateFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`File ${file.name} uploaded to cloud storage.`);
        resolve();
      }, 1000);
    });
  };

  const simulateDatabaseStore = (albumInfo: AlbumInfo): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Album info stored in database:', albumInfo);
        resolve();
      }, 1000);
    });
  };

  const handleUpload = async (): Promise<void> => {
    if (songs.length === 0) {
      setMessage('Please select at least one MP3 file to upload.');
      return;
    }
    setMessage('Upload started. This may take a while...');

    try {
      // Simulate API call to upload files and store in database
      const uploadPromises = songs.map(song => simulateFileUpload(song));
      await Promise.all(uploadPromises);

      // Simulate storing album info in database
      await simulateDatabaseStore({
        title: albumTitle,
        coverImage: albumCover,
        songs: songs.map(song => song.name),
      });

      setIsUploaded(true);
      setUploadedAlbum({
        name: albumTitle,
        songCount: songs.length,
        streams: 0,
        likesSaves: 0,
        revenue: 0
      });
      setMessage('Album successfully uploaded and stored in the database.');
    } catch (error) {
      setMessage('Error uploading album. Please try again.');
      console.error('Upload error:', error);
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-[#121212] p-4 flex justify-between items-center">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by song or artist"
                className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-[#EBE7CD]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/home" className="text-[#1ED760] hover:text-white">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/settings" className="text-[#1ED760] hover:text-white">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Upload Content or Uploaded Album View */}
        <div className="flex-1 p-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-2xl mx-auto">
            {!isUploaded ? (
              // Upload Form
              <>
                <div className="flex items-start space-x-6 mb-6">
                  <div 
                    className="w-40 h-40 bg-[#282828] rounded-md flex-shrink-0 flex items-center justify-center cursor-pointer"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {albumCover ? (
                      <img src={URL.createObjectURL(albumCover)} alt="Album Cover" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={coverInputRef}
                    onChange={handleAlbumCoverUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={albumTitle}
                      onChange={(e) => setAlbumTitle(e.target.value)}
                      placeholder="Enter Album Title"
                      className="text-4xl font-bold text-white mb-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-[#1ED760] w-full"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#282828] text-[#EBE7CD] rounded-full py-2 px-4 flex items-center space-x-2 hover:bg-[#3E3E3E] transition-colors"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Click to Upload MP3s</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleSongUpload}
                      accept=".mp3,audio/mpeg"
                      multiple
                      className="hidden"
                    />
                  </div>
                </div>
                {songs.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Uploaded Songs:</h3>
                    <ul className="list-disc list-inside">
                      {songs.map((song, index) => (
                        <li key={index} className="text-gray-300">{song.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {message && (
                  <p className="mt-4 text-yellow-400">{message}</p>
                )}
                <button
                  onClick={handleUpload}
                  className="mt-6 bg-[#1ED760] text-black font-bold py-2 px-4 rounded-full hover:bg-[#1DB954] transition-colors"
                >
                  Upload Album
                </button>
              </>
            ) : (
              // Uploaded Album View
              <>
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-700 rounded-full mr-6">
                      {albumCover && (
                        <img src={URL.createObjectURL(albumCover)} alt="Album Cover" className="w-full h-full object-cover rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">New Album</p>
                      <h2 className="text-4xl font-bold mb-2">{uploadedAlbum.name}</h2>
                      <p className="text-sm text-gray-400 mb-4">{uploadedAlbum.songCount} Songs</p>
                      <Link 
                        to="/artist" 
                        className="bg-[#1ED760] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1DB954] transition-colors"
                      >
                        Back to Artist Page
                      </Link>
                    </div>
                  </div>
                  <Link to="/editalbum" className="text-gray-400 hover:text-white">
                    <Edit2 className="w-5 h-5" />
                  </Link>
                </div>
                <div className="bg-[#2A2A2A] rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Album Statistics</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Streams: {uploadedAlbum.streams.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Likes/Saves: {uploadedAlbum.likesSaves.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Revenue: ${uploadedAlbum.revenue.toLocaleString()}</p>
                  </div>
                  <button className="mt-4 bg-[#1ED760] text-black px-4 py-2 rounded-full text-sm hover:bg-[#1DB954] transition-colors">
                    Generate Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;