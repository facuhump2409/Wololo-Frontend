import api from '../api'

export const getGames = () => api.get('/games')

export const createGame = (provinceTownAndParticipants) => api.post('/games',provinceTownAndParticipants);

export const getProvinces = () => api.get('/games/provinces');

export const getGame = (gameId) => api.get(`/games/${gameId}`);

export const surrender = (gameId) => api.put(`/games/${gameId}`);

export const attackTown = (gameId,from,to) => api.post(`/games/${gameId}/actions/attack`,JSON.stringify({from: from, to: to}));

export const moveGauchos = (gameId,from,to,amountOfGauchos) => api.post(`/games/${gameId}/actions/movement`,JSON.stringify({from: from, to: to,gauchosQty: amountOfGauchos}));

export const finishTurn = (gameId) => api.put(`/games/${gameId}/actions/turn`)

export const getTownStats = (gameId,townId) => api.get(`/games/${gameId}/towns/${townId}`)

export const updateSpecialization = (gameId,townId,newSpecialization) => api.put(`/games/${gameId}/towns/${townId}`,newSpecialization)