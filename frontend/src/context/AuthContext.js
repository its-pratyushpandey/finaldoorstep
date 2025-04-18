import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext default values
const AuthContext = createContext({
  token: '',
  user: null,
  loading: true,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

// ✅ Use environment variable from .env
const API_BASE = process.env.REACT_APP_AUTH_API_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Token verification failed');

        const data = await response.json();
        if (data?.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('Auth check failed:', error.message);
        logout(); // Clear token on error
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const saveAuthData = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      return true;
    } catch (error) {
      console.error('Register error:', error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      saveAuthData(data.token, data.user);
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
