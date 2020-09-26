export const initialState = {
    isAuthorized: (localStorage.getItem('isAuthorized') === 'true') || false,
    inProgress: false,
    user: null,
    games: []
    // redirectTo: null
}