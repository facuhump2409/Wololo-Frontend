export const townsFrom = (user, towns) => towns.filter(aTown => aTown.ownerId === user);

export const isMyTurn = (game, user) => game.turnId === user