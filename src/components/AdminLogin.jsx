import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const credentials = { username, password };

    try {
      await axios.post('http://localhost:5000/api/login', credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed.');
    }
  };
  

  return (
    <div className="flex items-center justify-center h-[100vh] font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl animate-fadeIn">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="p-3 text-center text-red-800 bg-red-100 border border-red-300 rounded-lg animate-shake">
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:bg-gray-400 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
