import api from '../api'

export const login = (userAndPass) => new Promise((resolve,reject) => {
    api.post('/users/tokens', userAndPass,(userAndPass) => {
        resolve(userAndPass)
    }).fail(error => {
        reject(new Error('Call Failed with status',error.status))
    })
})

export const signOut = (token) => api.delete('/users/tokens');

export const signUp = (data) => api.post('/users', data);
