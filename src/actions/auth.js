export const login = (token, email) => ({
  type: 'LOGIN',
  token,
  email
});

export const logout = () => ({
  type: 'LOGOUT'
});