import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_GAME } from '../../../redux/actionTypes';
import { getGame } from '../../../services/games';
import Map from './components/Map'
import TownInfo from './components/TownInfo'

const Game = (props) => {
  const dispatch = useDispatch();
  const { activeGame, errors } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if(!activeGame) dispatch({ type: GET_GAME, payload: getGame(parseInt(props.match.params.id)) })
  }, [dispatch, props.match.params.id, activeGame])

  const handleHover = (area) => {
    if(!clicked) {
      setTown(activeGame.province.towns.find(aTown => aTown.name === area.name));
    }
  }

  const handleClick = () => {
    setClicked(true);
  }

  const handleReturn = () => {
    setClicked(false);
  }

  return (
    activeGame && !errors ? (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center col-6'>
          <Map name='gameMap' game={activeGame} handleHover={handleHover} handleClick={handleClick} currentUser={2} />  
        </div>

        <div className='d-flex justify-content-center col-6'>
          { town  ? 
            <TownInfo town={town} clicked={clicked} handleReturn={handleReturn} />
            : null 
          }
        </div>
      </div>
    </div>
    ) :
    <h1>No Active Game</h1>
  )
}

export default Game;
