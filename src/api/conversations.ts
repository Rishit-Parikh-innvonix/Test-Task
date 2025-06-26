import api from './axios';

export const getMessagesByConversationId = async (conversationId: number) => {
  const res = await api.get(`/conversations/${conversationId}/messages/`);
  return res.data;
};
