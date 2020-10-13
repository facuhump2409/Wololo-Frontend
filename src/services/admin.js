import api from '../api'
const today = new Date().toLocaleDateString()
const monthBefore = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
).toLocaleDateString(); //por default busque un mes para atras
export const gamesStats = (from = today,to = monthBefore) => api.get('/games/stats', {
            from: from,
            to: to
})

export const userStats = (username) => api.get('/users/',username);

// export const scoreBoard = (data) => api.post('/scoreBoard', data);
