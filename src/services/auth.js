import api from '../api'

export const login = (userAndPass) => api.post('/users/tokens', userAndPass);

export const signOut = (token) => api.delete('/users/tokens');

export const signUp = (data) => api.post('/users', data);
