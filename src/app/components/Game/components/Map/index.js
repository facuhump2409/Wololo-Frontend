import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import ImageMapper from 'react-image-mapper';
import './index.css'


function Map({ dimensions, circles, name, imageUrl, handleHover, handleClick }) {
  return (
    <ImageMapper
      src={imageUrl}
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