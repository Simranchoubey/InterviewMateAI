import { useState, useEffect } from 'react';
import authService from '../services/authService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setLoading(false);
    };

    checkAuth();
    
    // Optional: listen to storage changes if multiple tabs are used
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setIsAuthenticated(true);
    return data;
  };

  const signup = async (userData) => {
    const data = await authService.signup(userData);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };
};

export default useAuth;