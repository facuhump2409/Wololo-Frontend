import React, { useState } from 'react';
import ImageMapper from 'react-image-mapper';
import './index.css'


function Map({ name, handleHover, handleClick, towns }) {
  const dimensions = { width: 500, height: 500 }
  
  const circle = (x, factMultX, factMultY) => 
    [(dimensions.width * (1 + (2*factMultX)))/(2 ** (x+1)), (dimensions.height * (1 + (2*factMultY)))/ (2**(x+1)), dimensions.width/(2**(x+1))]

  const getFactor = (townsQuantity) => {
    let factor = 0;
    while(4**factor < townsQuantity) {
      factor++;
    }
    return factor;
  }

  const createCircles = factor => {
    const maxCirclesInLine = factor ** 2;
    let circles = [];

    for(let i = 0; i < maxCirclesInLine; i++) {
      for(let j = 0; j < maxCirclesInLine; j++) {
        circles.push(circle(factor, i, j));
      }
    }

    return circles;
  }

  function createAreas() {
    const factor = getFactor(towns.length);
    const circles = createCircles(factor);
    return towns.map((aTown, index) => ({ name: aTown.name, shape: 'circle', coords: circles[index], strokeColor: '#000000', preFillColor:'rgba(255,255,255,0.5)'}))
  }

  const MAP = {
    name,
    areas: createAreas(),
  }

  return (  
  <ImageMapper 
  src={process.env.PUBLIC_URL + '/Buenos_aires.webp'} 
  map={MAP} 
  onClick={ area => handleClick(area) } 
  onMouseEnter={area => handleHover(area) }
  width={dimensions.width} 
  height={dimensions.height} />
)
}

export default Map;