import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {GET_GAME, PASS_TURN, SURRENDER} from '../../../redux/actionTypes';
import {getGame, finishTurn, surrender} from '../../../services/games';
import { getFromLocal } from '../../../services/localStorage'
import { isMyTurn, isActive, isMyTown } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import SweetAlert from "react-bootstrap-sweetalert";
import './index.css'
import TownInfo from './components/TownInfo';

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, errors, inProgress, gameChanged } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [selectedTowns, setSelectedTowns] = useState({town1: null, town2: null});
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

  const handleHover = (town) => {
    setTown(town)
  }


  const handleClick = (town) => {
    if(isMyTurn(activeGame, currentUser.id)) {
      setSelectedTowns(!selectedTowns.town1 ? 
        { town1: isMyTown(town, currentUser.id) ? town : null, town2: null } : 
        (!selectedTowns.town2 ? 
          { town1: selectedTowns.town1, town2: town } : 
          selectedTowns
        )
      )
    }
  }

  const handleReturn = () => setSelectedTowns({town1: null, town2: null})

  const handleSurrender = (showSurrenderModal) => {
    if (showSurrenderModal) {
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
        <div>
          <Map center={[-54.6516966230371, -26.8753965086829]}
          province={activeGame.province}
          onTownHover={handleHover} 
          onTownClick={handleClick} 
          currentUser={currentUser}
           />

          { town && <TownInfo style={{  
            width: '25%',
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.8)',
            bottom: '22px',
            right: '2px',
            zIndex: 2,
            }} 
            town={town} 
            selectedTowns={selectedTowns}
            currentUser={currentUser.id}
            onSpecializationChange={handleReturn}
            ></TownInfo>
          }
          
          <div className=' d-flex justify-content-center col-6'>
          <Button color='danger' className='surrender' onClick={showModal}>Surrender</Button>
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
          <Button color='primary' className='pass' onClick={showPassModal} disabled={!isMyTurn(activeGame, currentUser.id)}>Pass Turn</Button>  
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
