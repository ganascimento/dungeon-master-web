const JWT_KEY = "#@_DUNGEON_MASTER_AI_KEY_@#";

export const isAuthenticated = () => {
  const token = localStorage.getItem(JWT_KEY);
  if (!token || token.trim() === "") return false;

  const tokenSplit = token.split(".");
  if (tokenSplit.length !== 3) return false;

  const tokenData = JSON.parse(atob(tokenSplit[1]));

  return tokenData.exp > Date.now() / 1000;
};

export const logOff = () => {
  localStorage.setItem(JWT_KEY, "");
};

export const setAuthentication = (token: string) => {
  localStorage.setItem(JWT_KEY, token);
};

export const getToken = (): string | null => localStorage.getItem(JWT_KEY);
