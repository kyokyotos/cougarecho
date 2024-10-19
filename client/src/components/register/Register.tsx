import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Listener');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasCapital) {
      return "Password must contain at least one capital letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // If passwords match and meet the criteria, proceed with the registration process
    console.log('Register attempt', { username, password, userType });
    // Add your registration logic here
    navigate('/confirm');
  };

  return (
    <div className="flex h-screen bg-[#0B3B24]">
      <div className="w-1/2 p-12 flex flex-col justify-between">
        <Link 
          to="/" 
          className="text-[#FAF5CE] text-2xl font-bold hover:text-[#FFFAD6] transition-colors duration-300"
        >
          echo
        </Link>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold text-[#FAF5CE] mb-8">Register</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-full bg-[#165C3A] text-[#FAF5CE] placeholder-[#8BC4A9]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-full bg-[#165C3A] text-[#FAF5CE] placeholder-[#8BC4A9]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-full bg-[#165C3A] text-[#FAF5CE] placeholder-[#8BC4A9]"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <div className="flex items-center space-x-4 text-[#FAF5CE]">
              <span>I am a:</span>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="bg-[#165C3A] rounded-full p-2 px-4"
              >
                <option>Listener</option>
                <option>Artist</option>
                <option>Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full p-4 rounded-full bg-[#4a8f4f] text-[#FAF5CE] hover:bg-[#5aa55f]"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[#FAF5CE]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D17A22] hover:underline">Login</Link>
          </p>
        </div>
        <div></div> {/* Spacer */}
      </div>
      <div className="w-1/2 bg-[#165C3A] flex justify-center items-center relative">
        <img
          src="/src/assets/undraw_happy_music_g6wc 3 (1).png"
          alt="Happy Music"
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.svg.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23cccccc%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-size%3D%2220%22%3EImage%20not%20found%3C%2Ftext%3E%3C%2Fsvg%3E';
            console.error('Error loading image:', e);
          }}
        />
      </div>
    </div>
  );
};

export default Register;