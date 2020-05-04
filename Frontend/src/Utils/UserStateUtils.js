const Keys = {
    User: 'user',
    Token: 'token'
}

export const getUser = () => {
  const userStr = sessionStorage.getItem(Keys.User);
  if (userStr) return JSON.parse(userStr);
  else return null;
}

export const getToken = () => {
  return sessionStorage.getItem(Keys.Token) || null;
}
 
export const removeUserSession = () => {
  sessionStorage.removeItem(Keys.Token);
  sessionStorage.removeItem(Keys.User);
}

export const setUserSession = (token, user) => {
  sessionStorage.setItem(Keys.Token, token);
  sessionStorage.setItem(Keys.User, JSON.stringify(user));
}