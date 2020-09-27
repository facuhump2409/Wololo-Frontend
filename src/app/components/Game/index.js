import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_GAME, PASS_TURN, SURRENDER } from '../../../redux/actionTypes';
import { getGame, finishTurn, surrender } from '../../../services/games';
import { getFromLocal } from '../../../services/localStorage'
import { townsFrom, isMyTurn, isActive } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import TownInfo from './components/TownInfo'
import SweetAlert from "react-bootstrap-sweetalert";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, errors } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showSurrenderModal, setSurrenderModal] = useState(false);

  useEffect(() => {
    if(!activeGame) dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) })
  }, [dispatch, props.match.params.id, activeGame])

  const handleHover = (area) => {
    if(!clicked) {
      setTown(activeGame.province.towns.find(aTown => aTown.name === area.name));
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
  }

  const showModal = () => {
    setSurrenderModal(true)
  }

  const passTurn = () => {
    dispatch({ type: PASS_TURN, payload: finishTurn(activeGame.id) })
  }

  return (
    activeGame && isActive(activeGame) && !errors ? (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center col-6'>
          <Map name='gameMap' game={activeGame} handleHover={handleHover} handleClick={handleClick} currentUser={currentUser.id} />  
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
            // warning
            custom
            showCancel
            confirmBtnText="Yes, I forfeit"
            confirmBtnBsStyle="danger"
            title="Are you sure you want to surrender?"
            onConfirm={() => handleSurrender(showSurrenderModal)}
            onCancel={() => setSurrenderModal(false)}
            timeout={1000}
            customIcon={process.env.PUBLIC_URL + "/carryOn.jpeg"}
            show={showSurrenderModal}
            focusCancelBtn
        >
          Your opponent will win the battle
        </SweetAlert>
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
