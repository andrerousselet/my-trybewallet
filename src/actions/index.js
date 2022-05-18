// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const userEmail = (email) => ({
  type: SET_USER_EMAIL,
  payload: email,
});
