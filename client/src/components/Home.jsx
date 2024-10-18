import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleTryNow = () => {
    navigate('/register');
  };

  return (
    <div className="bg-[#0B3B24] min-h-screen text-[#FAF5CE] p-6 flex flex-col">
      <nav className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold font-['Potta_One']">echo</div>
        <div className="space-x-6">
          <span className="text-[#FAF5CE]">Stream Music</span>
          <span className="text-[#FAF5CE]">Upload Music</span>
          <button
            onClick={handleLogin}
            className="bg-[#0B3B24] border border-[#FAF5CE] px-4 py-1 rounded-full hover:bg-[#165C3A]"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="bg-[#FAF5CE] text-[#0B3B24] px-4 py-1 rounded-full hover:bg-[#e0dbb7]"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center">
        <div className="w-1/2 pr-8">
          <h1 className="text-5xl font-bold mb-4">
            Tune your mind,<br />Free your imagination
          </h1>
          <p className="text-lg mb-8">
            Unleash your sound: Where music-making meets effortless streaming
          </p>
          <button 
            onClick={handleTryNow}
            className="bg-[#4a8f4f] text-[#FAF5CE] px-6 py-2 rounded-full text-lg hover:bg-[#5aa55f]"
          >
            Try Now
          </button>
        </div>
        <div className="w-1/2 relative flex justify-end items-end">
          <img
            src="/src/assets/Frame (1).png"
            alt="Decorative frame"
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.svg.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23cccccc%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-size%3D%2220%22%3EImage%20not%20found%3C%2Ftext%3E%3C%2Fsvg%3E';
              console.error('Error loading image:', e);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;