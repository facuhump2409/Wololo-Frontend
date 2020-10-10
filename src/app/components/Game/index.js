import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {GET_GAME, PASS_TURN, SURRENDER} from '../../../redux/actionTypes';
import {getGame, finishTurn, surrender} from '../../../services/games';
import { getFromLocal } from '../../../services/localStorage'
import { isMyTurn, isActive } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import SweetAlert from "react-bootstrap-sweetalert";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, errors, inProgress, gameChanged } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showSurrenderModal, setSurrenderModal] = useState(false);
  const [showTurnModal, setTurnModal] = useState(false);

  useEffect(() => {
    if(!activeGame && !inProgress) { 
      dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) })
    } 
    if(gameChanged && isActive(activeGame)) {
      setTown(town ? activeGame.province.towns.find(aTown => aTown.id === town.id) : null)
    }
  }, [dispatch, props.match.params.id, activeGame, currentUser, inProgress, gameChanged, town])

  const handleHover = (area) => {
    if(!clicked) {
      setTown(area.town);
    }
  }


  const handleClick = () => {
    if(isMyTurn(activeGame, currentUser.id)) setClicked(true)
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
    <div>
      <div className='row'>
        <div>
          <Map center={[-54.6516966230371, -26.8753965086829]}
          province={activeGame.province}
          handleHover={handleHover} 
          handleClick={handleClick} 
          currentUser={currentUser.id} />  
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
