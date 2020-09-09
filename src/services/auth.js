import api from '../api'

export const login = (userAndPass) => api.post('/users/tokens', userAndPass);

export const logout = (token) => api.delete('/users/tokens', token);

export const signUp = (data) => api.post('/users', data);
