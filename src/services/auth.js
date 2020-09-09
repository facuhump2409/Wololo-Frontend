import api from '../api'

const login = (userAndPass) => api.post('/users/tokens', userAndPass);

const logout = (token) => api.delete('/users/tokens', token);

const signUp = (data) => api.post('/users', data);

export default { login, logout, signUp }
