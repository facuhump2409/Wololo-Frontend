export const townsFrom = (user, towns) => towns.filter(aTown => aTown.ownerId === user);

export const isMyTurn = (user, game) => game.turnId === user