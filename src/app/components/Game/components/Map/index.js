import React, { useState } from 'react';
import ImageMapper from 'react-image-mapper';
import './index.css'


function Map({ name, handleHover, handleClick, towns }) {
  

  const dimensions = { width: 500, height: 500 }

  const circle = (factor, { factMultX, factMultY }) =>
    [(dimensions.width * (1 + (2 * factMultX))) / (2 ** (factor + 1)),
     (dimensions.height * (1 + (2 * factMultY))) / (2 ** (factor + 1)),
      dimensions.width / (2 ** (factor + 1))
    ]

  const getFactor = (townsQuantity) => {
    let factor = 0;
    while (4 ** factor < townsQuantity) {
      factor++;
    }
    return factor;
  }

  const createCircles = (factor, towns) => {
    let usedPoints = [];
    
    const randomNumber = (factor) => Math.floor(Math.random() * (2**factor));

    const randomPoint = (factor) => {
      let point = { factMultX: randomNumber(factor), factMultY: randomNumber(factor) };
      
      if(usedPoints.some(aPoint => isSamePoint(aPoint, point))) return randomPoint(factor);
      
      usedPoints.push(point);
      return point;
    }

    const isSamePoint = (aPoint, anotherPoint) => aPoint.factMultX === anotherPoint.factMultX && aPoint.factMultY === anotherPoint.factMultY

    return towns.map(aTown => ({
      name: aTown.name, 
      shape: 'circle', 
      coords: circle(factor, randomPoint(factor)),
      strokeColor: '#000000', 
      preFillColor: 'rgba(255,255,255,0.5)' 
    }));
  }

  function createAreas() {
    const factor = getFactor(towns.length);
    return createCircles(factor, towns);
  }
  const [circles, setCircles] = useState(createAreas());
  
  const MAP = {
    name,
    areas: circles,
  }

  return (
    <ImageMapper
      src={process.env.PUBLIC_URL + '/Buenos_aires.webp'}
      map={MAP}
      onClick={area => handleClick(area)}
      onMouseEnter={area => handleHover(area)}
      width={dimensions.width}
      height={dimensions.height} />
  )
}

export default Map;