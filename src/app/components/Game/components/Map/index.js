import React, { useState } from 'react';
import ImageMapper from 'react-image-mapper';
import './index.css'

function Map({ name, handleHover }) {
  const dimensions = { width: 500, height: 500 }

  const MAP = {
    name,
    areas: [
    { name:'Castelar', shape: 'rect', coords: [0, 0, dimensions.width/2, dimensions.height], strokeColor: '#000000' },
    { name:'Villa Crespo', shape: 'rect', coords: [dimensions.width/2, 0, dimensions.width, dimensions.height], strokeColor: '#000000' }
  ]}

  const handleClick = (area) => {
    console.log(area.name);
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