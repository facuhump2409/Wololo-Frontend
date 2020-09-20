export const initialState = {
    isAuthorized: (localStorage.getItem('isAuthorized') === 'true') || false,
    inProgress: false,
    // viewChangeCounter: 0
}