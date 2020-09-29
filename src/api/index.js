import {create} from 'apisauce';

const api = create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: `${window.location.origin}/api`,
  timeout: 20000,
});

export default api;