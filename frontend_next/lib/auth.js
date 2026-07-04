const TOKEN_KEY = "token";
const USER_KEY = "user";

const isBrowser = () => typeof window !== "undefined";

export const getAuthToken = () => {
  if (!isBrowser()) {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const getAuthUser = () => {
  if (!isBrowser()) {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const saveAuthSession = ({ token, user }) => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
