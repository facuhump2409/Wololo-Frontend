const colors = {
  unOwned: 'rgba(0, 0, 0, 0.5)',
  current: 'rgba(29, 237, 29, 0.75)',
  otherPlayers: ['rgba(199, 0, 0, 0.7)', 'rgba(23, 0, 199, 0.7)', 'rgba(199, 149, 0, 0.7)']
}

const colorFor = (ownerId) => colors.otherPlayers[ownerId % 3];

const randomNumber = (to) => Math.floor(Math.random() * to);

const circle = (factor, { factMultX, factMultY }, { width, height }) =>
    [(width * (1 + (2 * factMultX))) / (2 ** (factor + 1)),
     (height * (1 + (2 * factMultY))) / (2 ** (factor + 1)),
      width / (2 ** (factor + 1))
    ]

const getFactor = (townsQuantity) => {
  let factor = 0;
  while (4 ** factor < townsQuantity) {
    factor++;
  }
  return factor;
}

const isTownFrom = (aTown, currentUser) => aTown.ownerId === currentUser

const createCircles = (factor, towns, dimensions, currentUser) => {
  let usedPoints = [];

  const randomPoint = (factor) => {
    let point = { factMultX: randomNumber(2**factor), factMultY: randomNumber(2**factor) };
    
    while(usedPoints.some(aPoint => isSamePoint(aPoint, point))) {
      point = { factMultX: randomNumber(2**factor), factMultY: randomNumber(2**factor) }
    }
    
    usedPoints.push(point);
    return point;
  }

  const isSamePoint = (aPoint, anotherPoint) => aPoint.factMultX === anotherPoint.factMultX && aPoint.factMultY === anotherPoint.factMultY

  return towns.map(aTown => ({
    name: aTown.name, 
    shape: 'circle', 
    coords: circle(factor, randomPoint(factor), dimensions),
    strokeColor: 'rgba(0,0,0,0.3)', 
    preFillColor: isTownFrom(aTown, currentUser) ? colors.current : (!aTown.ownerId ? colors.unOwned : colorFor(aTown.ownerId)),
    test: 'test'
  }));
}

export const createAreas = (dimensions, towns, currentUser) => createCircles(getFactor(towns.length), towns, dimensions, currentUser);