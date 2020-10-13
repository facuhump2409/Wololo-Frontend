import { getFromLocal } from '../../services/localStorage'

export const initialState = {
    isAuthorized: (getFromLocal('isAuthorized') === 'true') || false,
    inProgress: false,
    user: null,
    games: [],
    activeGame: null,
    finishedCreation: false,
    // isAdmin: false
    // redirectTo: null
}