function checkHasAuthToken() {
  const token = localStorage.getItem(env.AUTH_TOKEN_KEY);
  return !!token;
}

const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(env.AUTH_TOKEN_KEY);
};

function removeAuthToken() {
  localStorage.removeItem(env.AUTH_TOKEN_KEY);
}

function setAuthToken(token) {
  localStorage.setItem(env.AUTH_TOKEN_KEY, token);
}

function isAuthenticated() {
  if (localStorage.getItem(env.AUTH_TOKEN_KEY)) return true;
  return false;
}

const getIsEmailVerify = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem('IS_EMAIL_VERIFY');
};
