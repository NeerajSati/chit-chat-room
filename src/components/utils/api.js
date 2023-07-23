const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const registerAPI = () => {
  return `${baseUrl}/auth/register`;
};

export const loginAPI = () => {
  return `${baseUrl}/auth/login`;
};

export const getGroupsJoined = () => {
  return `${baseUrl}/groups/joined`;
};
export const getGroupMessages = (groupId) => {
  return `${baseUrl}/messages/all/${groupId}`;
};
export const getSearchedUsers = () => {
  return `${baseUrl}/user/search`;
};