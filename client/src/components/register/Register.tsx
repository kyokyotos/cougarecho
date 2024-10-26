import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Loader } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Listener');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Username validation states
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState('');

  // Password requirements state
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    capital: false,
    number: false
  });

  // Debounce function to prevent too many API calls
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Check username availability
  const checkUsername = async (username: string) => {
    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      setIsUsernameAvailable(false);
      return;
    }

    setIsCheckingUsername(true);
    setUsernameError('');

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://your-api/check-username?username=${username}`);
      const data = await response.json();

      if (response.ok) {
        setIsUsernameAvailable(data.isAvailable);
        if (!data.isAvailable) {
          setUsernameError('This username is already taken');
        }
      } else {
        setUsernameError('Error checking username availability');
        setIsUsernameAvailable(false);
      }
    } catch (error) {
      setUsernameError('Error checking username availability');
      setIsUsernameAvailable(false);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Debounced username check
  const debouncedCheckUsername = debounce(checkUsername, 500);

  // Handle username change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    if (newUsername.trim()) {
      setIsCheckingUsername(true);
      debouncedCheckUsername(newUsername);
    } else {
      setIsUsernameAvailable(null);
      setUsernameError('');
    }
  };

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

  // Update password requirements in real-time
  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      number: /[0-9]/.test(password)
    });
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check username availability one final time
    if (!isUsernameAvailable) {
      setError('Please choose a different username');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Replace with your actual registration API endpoint
      const response = await fetch('http://your-api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          userType
        }),
      });

      if (response.ok) {
        navigate('/confirm');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const RequirementIcon = ({ met }: { met: boolean }) => (
    met ?
      <Check className="w-4 h-4 text-green-500" /> :
      <X className="w-4 h-4 text-red-500" />
  );

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
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full p-4 rounded-full bg-[#165C3A] text-[#FAF5CE] placeholder-[#8BC4A9]"
                />
                {/* Username availability indicator */}
                {username && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {isCheckingUsername ? (
                      <Loader className="w-5 h-5 text-[#8BC4A9] animate-spin" />
                    ) : isUsernameAvailable ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {usernameError && (
                <p className="text-red-500 text-sm ml-4">{usernameError}</p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-full bg-[#165C3A] text-[#FAF5CE] placeholder-[#8BC4A9]"
              />
              {/* Password requirements display */}
              <div className="bg-[#0D4C2E] rounded-lg p-4 space-y-2 text-sm text-[#FAF5CE]">
                <h3 className="font-semibold mb-2">Password Requirements:</h3>
                <div className="flex items-center space-x-2">
                  <RequirementIcon met={passwordRequirements.length} />
                  <span className={passwordRequirements.length ? "text-green-500" : "text-red-500"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIcon met={passwordRequirements.capital} />
                  <span className={passwordRequirements.capital ? "text-green-500" : "text-red-500"}>
                    One capital letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RequirementIcon met={passwordRequirements.number} />
                  <span className={passwordRequirements.number ? "text-green-500" : "text-red-500"}>
                    At least one number
                  </span>
                </div>
              </div>
            </div>

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
              </select>
            </div>
            <button
              type="submit"
              disabled={!isUsernameAvailable || isCheckingUsername}
              className={`w-full p-4 rounded-full ${!isUsernameAvailable || isCheckingUsername
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#4a8f4f] hover:bg-[#5aa55f]'
                } text-[#FAF5CE]`}
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
          src="../assets/undraw_happy_music_g6wc 3 (1).png"
          alt="Happy Music"
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    </div>
  );
};

export default Register;