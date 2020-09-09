import {create} from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
});

export const setAuthHeader = (token) => api.setHeader('Authorization', `Bearer ${token}`);

export default api;