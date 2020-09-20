import React, { useState } from 'react'
import Map from './components/Map'
import TownInfo from './components/TownInfo'
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

    <div className='d-flex justify-content-center'>
      { town && towns.find(aTown => aTown.name === town) ? 
      <TownInfo town={towns.find(aTown => aTown.name === town)} />
      : null }
    </div>
    </div>
  )
}

export default Game;
