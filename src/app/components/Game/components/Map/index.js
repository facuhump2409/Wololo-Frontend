import React, { useState } from 'react';
import { createAreas } from './utils';
import ImageMapper from 'react-image-mapper';
import './index.css'


function Map({ name, game, handleHover, handleClick, currentUser }) {
  const dimensions = { width: 500, height: 500 }

  const [circles, setCircles] = useState(createAreas(dimensions, game.province.towns, currentUser));
  
  return (
    <ImageMapper
      src={game.province.imageUrl}
      map={{
        name,
        areas: circles,
      }}
      onClick={area => handleClick(area)}
      onMouseEnter={area => handleHover(area)}
      width={dimensions.width}
      height={dimensions.height} />
  )
}

export default Map;