import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const useAuth = () => {
  // On first load, check if a token already exists in localStorage
  const getInitialUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser);

  // Called after login form submission
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded); // { user_id, email, role }

    return decoded;   // caller can use role to redirect to correct dashboard
  };

  // Clears token and user from memory
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;