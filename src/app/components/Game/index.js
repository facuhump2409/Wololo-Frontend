import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {GET_GAME, PASS_TURN, SURRENDER, TOWN_STATS} from '../../../redux/actionTypes';
import {getGame, finishTurn, surrender, getTownStats} from '../../../services/games';
import { createAreas, updateAreas } from './components/Map/utils';
import { getFromLocal } from '../../../services/localStorage'
import { townsFrom, isMyTurn, isActive } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import TownInfo from './components/TownInfo'
import SweetAlert from "react-bootstrap-sweetalert";
import TownModal from "../Modals/townModal";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, errors, inProgress, gameChanged } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showSurrenderModal, setSurrenderModal] = useState(false);
  const [showTurnModal, setTurnModal] = useState(false);

  const dimensions = { width: 500, height: 500 }
  const [circles, setCircles] = useState(null);

  useEffect(() => {
    if(!activeGame && !inProgress) { 
      dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) })
    } 
    if(gameChanged && isActive(activeGame)) {
      setCircles(updateAreas(circles, activeGame.province.towns, currentUser))
      setTown(town ? activeGame.province.towns.find(aTown => aTown.id === town.id) : null)
      dispatch({ type: 'MAP_UPDATED' })
    }
  }, [dispatch, props.match.params.id, activeGame, dimensions, currentUser, inProgress, gameChanged, circles, town])

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

  const handleClick = () => {
    if(isMyTurn(activeGame, currentUser.id)) setClicked(true)
  }

  const handleReturn = () => {
    setClicked(false);
  }

  const handleSurrender = (showSurrenderModal) => {
    if (showSurrenderModal) {
      console.log("Entre")
      dispatch({ type: SURRENDER, payload: surrender(activeGame.id) })
    }
    setSurrenderModal(false)
  }

  const showModal = () => {
    setSurrenderModal(true)
  }

  const showPassModal = () => {
    setTurnModal(true)
  }

  const passTurn = () => {
    dispatch({ type: PASS_TURN, payload: finishTurn(activeGame.id) })
    setTurnModal(false)
  }

  return (
    activeGame && isActive(activeGame) && !errors ? (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center col-6'>
          <Map name='gameMap' 
          dimensions={dimensions} 
          circles={ circles ? circles : initializeCircles() } 
          imageUrl={ activeGame.province.imageUrl } 
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
          <Button color='danger' onClick={showModal}>Surrender</Button>
        </div>
        <SweetAlert
            warning
            // custom
            showCancel
            confirmBtnText="Yes, I forfeit"
            confirmBtnBsStyle="danger"
            title="Are you sure you want to surrender?"
            onConfirm={() => handleSurrender(showSurrenderModal)}
            onCancel={() => setSurrenderModal(false)}
            timeout={1000}
            // customIcon={carryOnIcon}
            show={showSurrenderModal}
            focusCancelBtn
        >
          Your opponent will win the battle
        </SweetAlert>
        <div className='d-flex justify-content-center col-6'>
          <Button color='primary' onClick={showPassModal} disabled={!isMyTurn(activeGame, currentUser.id)}>Pass Turn</Button>  
        </div>
        <SweetAlert
            info
            title="It's your opponents turn now"
            onConfirm={() => passTurn()}
            onCancel={() => passTurn()}
            // timeout={2000}
            show={showTurnModal}
        >
          Wait until they play to attack again
        </SweetAlert>
      </div>
    </div>
    ) :
    <h1>No Active Game</h1>
  )
}

export default Game;
