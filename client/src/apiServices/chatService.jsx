import axios from "axios";

export const getChatMessage = (chatId) =>
  axios.get(`/message/getMessage/${chatId}`);
export const sendChatMessage = (chatId, message) =>
  axios.post(`/message/sendMessage/${chatId}`, { message });
