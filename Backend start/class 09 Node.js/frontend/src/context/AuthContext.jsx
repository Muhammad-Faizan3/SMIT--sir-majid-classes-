import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const authRequest = async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, data);
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      }
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Something went wrong',
      };
    }
  };

  const register = async (name, email, password) => {
    return authRequest('register', { name, email, password });
  };

  const login = async (email, password) => {
    return authRequest('login', { email, password });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
