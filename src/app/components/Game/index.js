import React, { useState } from 'react'
import Map from './components/Map'
import { towns } from './constants'

const Game = () => {
  const [town, setTown] = useState(null)
  
  const handleHover = (area) => {
    setTown(area.name);
  }

  return (
    <div>

      <div className='d-flex justify-content-center'>
        
      <Map name='gameMap' handleHover={handleHover}/>
        
      </div>
      { towns.find(aTown => aTown.name === town) ? 
      [towns.find(aTown => aTown.name === town)].map(aTown => (<div>
        <p>Town name: {aTown.name}</p>
        <p>Owner: {aTown.owner.username}</p>
        <p>Coordinates: LATITUDE {aTown.coordinates.lat}, LONGITUDE {aTown.coordinates.lon}</p>
        <p>gauchos quantity: {aTown.gauchos}</p>
        <p>is locked: {aTown.isLocked.toString()}</p>
      </div>))
      : null }
    </div>
  )
}

export default Game;
