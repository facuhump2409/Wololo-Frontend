export const initialState = {
    isAuthorized: (localStorage.getItem('isAuthorized') === 'true') || false,
    inProgress: false,
    // redirectTo: null
    // viewChangeCounter: 0
}