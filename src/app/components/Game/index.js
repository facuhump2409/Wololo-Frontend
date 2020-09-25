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
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center col-6'>
          <Map name='gameMap' handleHover={handleHover} handleClick={handleClick} towns={towns} />  
        </div>

        <div className='d-flex justify-content-center col-6'>
          { town && towns.find(aTown => aTown.name === town) ? 
            <TownInfo town={towns.find(aTown => aTown.name === town)} clicked={clicked} handleReturn={handleReturn} />
            : null 
          }
        </div>
      </div>
    </div>
  )
}

export default Game;
