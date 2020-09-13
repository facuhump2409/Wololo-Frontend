import React, { useState } from 'react'

const Game = () => {
  const [imageDimensions, setImageDimensions] = useState({dimensions: {}}) 
  const [test, setTest] = useState('');

  const handleOnImageLoad = (event) => {
    setImageDimensions({
      dimensions: {
        height: event.target.offsetHeight,
        width: event.target.offsetWidth
      }
    })
  }

  const handleClick1 = (event) => {
    setTest('VAMOS MANAOS')
  }

  const handleClick2 = (event) => {
    setTest('VAMO PECSI')
  }

  return (
    <div className='game-container'>
      <img 
        src={process.env.PUBLIC_URL + '/Buenos_aires.webp'} 
        alt='provincia' 
        useMap='#gameMap'
        onLoad={handleOnImageLoad}
        />

      <map name="gameMap">
        <area shape='rect'
         coords={`0, 0, ${imageDimensions.dimensions.width/2}, ${imageDimensions.dimensions.height}`} 
         alt='Player 1'
         onClick={handleClick1} 
         />
        <area shape='rect'
         coords={`${imageDimensions.dimensions.width/2}, 0, ${imageDimensions.dimensions.width}, ${imageDimensions.dimensions.height}`} 
         alt='Player 1'
         onClick={handleClick2} 
         />
      </map>

      <h1>{test}</h1>
    </div>
  )
}

export default Game;
