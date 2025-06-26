import api from './axios';

export const createUser = async (username: string, email: string) => {
  const res = await api.post('/users/', { username, email });
  return res.data;
};

export const getUserConversations = async (userId: number) => {
  const res = await api.get(`/users/${userId}/conversations/`);
  return res.data;
};
