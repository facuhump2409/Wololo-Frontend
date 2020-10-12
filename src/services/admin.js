import api from '../api'
const today = new Date().toISOString().slice(0, 10)
const monthBefore = today.setMonth(today.getMonth() - 1) //por default busque un mes para atras
export const gamesStats = (from = today,to = monthBefore) => api.get('/games/stats', {
        params: {
            from: from,
            to: to
        }
})

export const userStats = (username) => api.get('/users/',username);

// export const scoreBoard = (data) => api.post('/scoreBoard', data);
