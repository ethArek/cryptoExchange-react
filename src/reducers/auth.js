export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        email: action.email,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}