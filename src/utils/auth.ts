// src/utils/auth.ts
const LOCAL_STORAGE_KEY = 'chat_user';

export const getStoredUser = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY);
};
