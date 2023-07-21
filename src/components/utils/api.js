const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const registerAPI = () => {
  return `${baseUrl}/auth/register`;
};

export const loginAPI = () => {
  return `${baseUrl}/auth/login`;
};

export const getCreateChatAPI = () => {
  return `${baseUrl}/chat/create`;
};
export const getChatListAPI = () => {
  return `${baseUrl}/chat/list`;
};

export const getMessagesListAPI = (chatID) => {
  return `${baseUrl}/message/list?chatID=${chatID}`;
};

export const getSendMessageAPI = () => {
  return `${baseUrl}/message/send`;
};

export const getSearchUsersAPI = (username) => {
  return `${baseUrl}/user/search?username=${username}`;
};