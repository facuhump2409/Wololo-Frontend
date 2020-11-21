import api from '../api'
const today = new Date()
const monthBefore = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
); //por default busque un mes para atras
export const gamesStats = (from = today,to = monthBefore) => api.get('/games/stats', {
            from: from.toLocaleDateString(),
            to: to.toLocaleDateString()
})

export const userStats = (username) => api.get('/users/',username);

export const scoreBoard = () => api.get('/users/scoreboard');
