import api from '../api';

export const createGame = (game) => api.post('/games', game);