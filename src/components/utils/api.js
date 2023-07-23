const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const registerAPI = () => {
  return `${baseUrl}/auth/register`;
};

export const loginAPI = () => {
  return `${baseUrl}/auth/login`;
};

export const getJoinedChatsAPI = () => {
  return `${baseUrl}/groups/joined`;
};

export const getGroupMessagesAPI = (groupId) => {
  return `${baseUrl}/messages/all/${groupId}`;
};

export const getSearchedUsersAPI = () => {
  return `${baseUrl}/user/search`;
};

export const postNewGroupAPI = () => {
  return `${baseUrl}/groups/create`;
};

export const postNewOneToOneChatAPI = () => {
  return `${baseUrl}/groups/createSingle`;
};

export const getGroupDetailsAPI = (groupId) => {
  return `${baseUrl}/groups/details/${groupId}`;
};

export const getGroupMembersAPI = (groupId) => {
  return `${baseUrl}/groups/members/${groupId}`;
};