import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {GET_GAME, GET_MAP, PASS_TURN, REDIRECT_GAME, SURRENDER} from '../../../redux/actionTypes';
import {getGame, finishTurn, surrender, getMap} from '../../../services/games';
import { getFromLocal } from '../../../services/localStorage'
import { isMyTurn, isActive, isMyTown, isValidSelection, mapTowns } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import SweetAlert from "react-bootstrap-sweetalert";
import socketIOClient from 'socket.io-client';
import './index.css'
import TownActions from './components/TownActions';

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, map, errors, inProgress, gameChanged } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [selectedTowns, setSelectedTowns] = useState({town1: null, town2: null});
  const [showSurrenderModal, setSurrenderModal] = useState(false);
  const [showTurnModal, setTurnModal] = useState(false);

  useEffect(() => {
    if(!activeGame && !inProgress) { 
      dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) })
    } else if(!map && isActive(activeGame)) {
        const mappedTowns = mapTowns(activeGame.province.towns);
        debugger;
        dispatch({ type: GET_MAP, payload: getMap(activeGame.province.name, mappedTowns) })
    }
    if(gameChanged && isActive(activeGame)) {
      setTown(town ? activeGame.province.towns.find(aTown => aTown.id === town.id) : null)
    }
  }, [dispatch, props.match.params.id, activeGame, currentUser, inProgress, gameChanged, town, map])

  useEffect(() => {
    if(activeGame && map) {
      const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);
      socket.emit('joinGameRoom', activeGame.id)
      socket.on('update', () => dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) }));

      if(gameChanged) {
        socket.emit('notifyGameUpdate');
      }

      return () => socket.disconnect();
    }
  }, [activeGame, dispatch, gameChanged, map, props.match.params.id])

  const redirect = () => {
    dispatch({ type: REDIRECT_GAME })
  }

  const handleHover = (town) => {
    if(!Object.values(selectedTowns).some(aTown => aTown && (town.id === aTown.id))) {
      setTown(town)
    }
  }

  const handleClick = (town) => {
    if(isMyTurn(activeGame, currentUser.id)) {
      setTown(null)
      setSelectedTowns(!selectedTowns.town1 ? 
        { town1: isMyTown(town, currentUser.id) ? town : null, town2: null } : 
        (!selectedTowns.town2 && isValidSelection(selectedTowns.town1, town) ? 
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
          {map && <Map
          province={activeGame.province}
          geojson={map}
          onTownHover={handleHover} 
          onTownClick={handleClick} 
          currentUser={currentUser}
           />}
          <TownActions style={{  
            width: '25%',
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.8)',
            bottom: '22px',
            right: '2px',
            zIndex: 2,
            }} 
            hoveredTown={town} 
            selectedTowns={selectedTowns}
            currentUser={currentUser.id}
            currentGame={activeGame.id}
            onChange={handleReturn}
            ></TownActions>
          
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
    <SweetAlert
    info
    title="The game ended!"
    onConfirm={() => redirect()}
    onCancel={() => redirect()}
    // timeout={2000}
    show
          ></SweetAlert>
  )
}

export default Game;
