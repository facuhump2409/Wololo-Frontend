import socketIOClient from 'socket.io-client';

export const townsFrom = (user, towns) => towns.filter(aTown => aTown.ownerId === user);

export const isMyTurn = (game, user) => game.turnId === user

export const mapTowns = (towns) => towns.map(town => town.name).join('%7C')

export const isMyTown = (town, user) => town.ownerId === user 

export const isBordered = (aTown, anotherTown) => {debugger; return aTown.borderingTowns.some(town => town === anotherTown.name)}

export const isValidSelection = (aTown, anotherTown) => isBordered(aTown, anotherTown) && (aTown.id !== anotherTown.id 
&& (aTown.ownerId !== anotherTown.ownerId 
|| (!aTown.isLocked && !anotherTown.isLocked && aTown.gauchos)))

export const isActive = (game) => ['FINISHED', 'CANCELED'].every(status => status !== game.status)

export const townWithOwner = (town, players) => ({...town, owner: town.ownerId && players.find(player => player.id === town.ownerId)})

export const getSocket = () => socketIOClient(`${process.env.REACT_ENV === 'production' ? window.location.origin : 'localhost'}:${process.env.REACT_APP_SOCKET_PORT}`);

const mapFromArrays = (array, otherArray) => {
  let map = {}
  array.forEach((item, index) => map[item] = otherArray[index])
  return map;
}

export const playersAndColors = (players, colors, currentUser) => 
  mapFromArrays(players.filter(player => player !== currentUser), colors);

