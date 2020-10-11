export const townsFrom = (user, towns) => towns.filter(aTown => aTown.ownerId === user);

export const isMyTurn = (game, user) => game.turnId === user

export const isMyTown = (town, user) => town.ownerId === user 

export const isActive = (game) => ['FINISHED', 'CANCELED'].every(status => status !== game.status)