// src/hooks/useAuth.ts
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'chat_user';

export const useAuth = () => {
  const navigate = useNavigate();

  const getUser = () => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    navigate('/');
  };

  return { getUser, logout };
};
