import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_GAME, PASS_TURN, SURRENDER } from '../../../redux/actionTypes';
import { getGame, finishTurn, surrender } from '../../../services/games';
import { createAreas, updateAreas } from './components/Map/utils';
import { getFromLocal } from '../../../services/localStorage'
import { townsFrom, isMyTurn, isActive } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import TownInfo from './components/TownInfo'

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, errors, inProgress, gameChanged } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);

  const dimensions = { width: 500, height: 500 }
  const [circles, setCircles] = useState(null);

  useEffect(() => {
    if(!activeGame && !inProgress) { 
      dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) })
    }
  }, [dispatch, props.match.params.id, activeGame, dimensions, currentUser, inProgress, gameChanged, circles])

  const handleHover = (area) => {
    if(!clicked) {
      setTown(area.town);
    }
  }

  const initializeCircles = () => {
    if(!circles) {
      setCircles(createAreas(dimensions, activeGame.province.towns, currentUser))
    }
  }

  const updateCircles = () => {
    setCircles(updateAreas(circles, activeGame.province.towns, currentUser))
    debugger;
    dispatch({ type: 'MAP_UPDATED' })
  }

  const handleClick = () => {
    if(isMyTurn(activeGame, currentUser.id)) setClicked(true)
  }

  const handleReturn = () => {
    setClicked(false);
  }

  const handleSurrender = () => {
    dispatch({ type: SURRENDER, payload: surrender(activeGame.id) })
  }

  const passTurn = () => {
    dispatch({ type: PASS_TURN, payload: finishTurn(activeGame.id) })
  }

  return (
    activeGame && isActive(activeGame) && !errors ? (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center col-6'>
          <Map name='gameMap' 
          dimensions={dimensions} 
          circles={circles ? (gameChanged ? updateCircles() : circles) : initializeCircles() } 
          imageUrl={activeGame.province.imageUrl} 
          handleHover={handleHover} 
          handleClick={handleClick} 
          currentUser={currentUser.id} />  
        </div>

        <div className='d-flex justify-content-center col-6'>
          { town ? 
            <TownInfo 
            activeGame={activeGame} 
            town={town} 
            clicked={clicked} 
            onReturn={handleReturn} 
            currentUser={currentUser.id} 
            currentUserTowns={townsFrom(currentUser.id, activeGame.province.towns)}/>
            : null 
          }
        </div>
      </div>
      <div className='row' style={{marginTop: '20px'}}>
        <div className='d-flex justify-content-center col-6'>
          <Button color='danger' onClick={handleSurrender}>Surrender</Button>  
        </div>
        <div className='d-flex justify-content-center col-6'>
          <Button color='primary' onClick={passTurn}>Pass Turn</Button>  
        </div>
      </div>
    </div>
    ) :
    <h1>No Active Game</h1>
  )
}

export default Game;
