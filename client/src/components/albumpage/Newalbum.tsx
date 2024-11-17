import React, { useState, useRef, useContext } from 'react';
import { Search, Home, Settings, Menu, User, PlusCircle, X, Music, LogOut, Upload, Image as ImageIcon, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { UserContext } from '../../context/UserContext';
const NEW_ALBUM_URL = '/newalbum';

interface UploadedAlbum {
  name: string;
  songCount: number;
  streams: number;
  likesSaves: number;
  revenue: number;
}

const ALLOWED_IMG_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg'];

const UploadPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const [albumName, setAlbumName] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [songs, setSongs] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [uploadedAlbum, setUploadedAlbum] = useState<UploadedAlbum>({
    name: '',
    songCount: 0,
    streams: 0,
    likesSaves: 0,
    revenue: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Upload album cover image
  const handleAlbumCoverUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target?.files?.[0];
    if (files && ALLOWED_IMG_TYPES.includes(files.type)) {
      setAlbumCover(files);
    } else {
      setMessage('Please upload a valid image file.');
    }
  };

  // Upload MP3 files for the album
  const handleSongUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event?.target?.files;
    if (files) {
      const mp3Files = Array.from(files).filter((file) => file.type === 'audio/mpeg');
      if (mp3Files.length !== files.length) {
        setMessage('Please upload only MP3 files.');
      }
      setSongs((prevSongs) => [...prevSongs, ...mp3Files]);
    }
  };

  const handleUpload = async (e): Promise<void> => {
    e.preventDefault();
    console.log('user_id: ', user.user_id);

    try {
      // Upload album information
      const albFormData = new FormData();
      albFormData.append('albumName', albumName);
      albFormData.append('user_id', user.user_id);
      if (albumCover) albFormData.append('img', albumCover);

      const alb_response = await axios.post('/album-insert', albFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const album_id = alb_response?.data?.album_id;
      console.log('album_id: ', album_id);

      if (album_id) {
        // Upload each song in the album
        for (const song_ of songs) {
          try {
            const formData = new FormData();
            formData.append('album_id', album_id);
            formData.append('user_id', user.user_id);
            formData.append('song', song_);

            await axios.post('/song-insert', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          } catch (songError) {
            console.error('Song upload error:', songError);
            if (songError.response && songError.response.status === 403) {
              alert(`ERROR: ${songError.response.data.error}`);
              return;
            }
            setMessage('Error uploading one or more songs. Please try again.');
          }
        }
      }

      setIsUploaded(true);
      setUploadedAlbum({
        name: albumName,
        songCount: songs.length,
        streams: 0,
        likesSaves: 0,
        revenue: 0,
      });
      alert('Album successfully uploaded.');

    } catch (albumError) {
      console.error('Album upload error:', albumError);
      if (albumError.response && albumError.response.status === 403) {
        alert(`ERROR: ${albumError.response.data.error}`);
      } else {
        alert('Error uploading album. Please try again.');
      }
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
          <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-[#EBE7CD] hover:text-white" aria-label="Upload">
            <Upload className="w-6 h-6" />
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
        <div className="flex-1 p-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-2xl mx-auto">
            {!isUploaded ? (
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
                    name='img'
                    ref={coverInputRef}
                    onChange={handleAlbumCoverUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex-grow">
                    <input
                      type="text"
                      name='txt'
                      value={albumName}
                      onChange={(e) => setAlbumName(e.target.value)}
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
                      name='song'
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
