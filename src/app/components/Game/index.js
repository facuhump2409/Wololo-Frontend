import React, { useState } from 'react'
import Map from './components/Map'
import TownInfo from './components/TownInfo'
import { towns } from './constants'

const Game = () => {
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleHover = (area) => {
    if(!clicked) {
      setTown(area.name);
    }
  }

  const handleClick = () => {
    setClicked(true);
  }

  const handleReturn = () => {
    setClicked(false);
  }

  return (
    <div>

      <div className='d-flex justify-content-center'>
      <Map name='gameMap' handleHover={handleHover} handleClick={handleClick}/>  
      </div>

    <div className='d-flex justify-content-center'>
      { town && towns.find(aTown => aTown.name === town) ? 
      <TownInfo town={towns.find(aTown => aTown.name === town)} clicked={clicked} handleReturn={handleReturn} />
      : null }
    </div>
    </div>
  )
}

export default Game;
