import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {CLEAR_DELTA_ACTION, GET_GAME, GET_MAP, PASS_TURN, REDIRECT_GAME, SURRENDER} from '../../../redux/actionTypes';
import {getGame, finishTurn, surrender, getMap} from '../../../services/games';
import { getFromLocal } from '../../../services/localStorage'
import { isMyTurn, isActive, isMyTown, isValidSelection, mapTowns, townWithOwner, playersAndColors } from './utils'
import { Button } from 'reactstrap'
import Map from './components/Map'
import SweetAlert from "react-bootstrap-sweetalert";
import socketIOClient from 'socket.io-client';
import './index.css'
import TownActions from './components/TownActions';
import ActionsInfo from './components/ActionsInfo';
import Players from './components/Players';
import { COLORS } from '../../constants';
import ActionResult from "./components/TownActions/actionResult";
import BattleResult from "../Modals/battleResult";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentUser = getFromLocal('currentUser');
  const { activeGame, map, errors, inProgress, gameChanged,showActionMessage,showAttackResult } = useSelector(state => state.games)
  const [town, setTown] = useState(null);
  const [selectedTowns, setSelectedTowns] = useState({town1: null, town2: null});
  const [showSurrenderModal, setSurrenderModal] = useState(false);
  const [showTurnModal, setTurnModal] = useState(false);

  const getActualGame = useCallback(() => dispatch({ type: GET_GAME, payload: getGame(props.match.params.id) }));

  const colors = activeGame && !errors && playersAndColors(activeGame.playerIds.map(player => player.id), COLORS.otherPlayers, currentUser.id);

  useEffect(() => {
    if(!activeGame && !inProgress) { 
      getActualGame()
    } else if(!map && !errors && isActive(activeGame)) {
        const mappedTowns = mapTowns(activeGame.province.towns);
        dispatch({ type: GET_MAP, payload: getMap(activeGame.province.name, mappedTowns) })
    }
    if(gameChanged && !errors && isActive(activeGame)) {
      setTown(town ? activeGame.province.towns.find(aTown => aTown.id === town.id) : null)
    }
  }, [dispatch, props.match.params.id, activeGame, currentUser, inProgress, gameChanged, town, map, getActualGame, errors])

  useEffect(() => {
    if(activeGame && map) {
      const socket = socketIOClient(`${process.env.REACT_ENV === 'production' ? window.location.origin : 'localhost'}:${process.env.REACT_APP_SOCKET_PORT}`);
      socket.emit('joinGameRoom', activeGame.id)
      socket.on('update', () => getActualGame());

      if(gameChanged) {
        socket.emit('notifyGameUpdate');
      }

      return () => socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameChanged])

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
        { town1: isMyTown(town, currentUser.id) ? townWithOwner(town, activeGame.playerIds) : null, town2: null } : 
        (!selectedTowns.town2 && isValidSelection(selectedTowns.town1, town) ? 
          { town1: selectedTowns.town1, town2: townWithOwner(town, activeGame.playerIds) } : 
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
  const clearDeltaAction = () => {
      dispatch({ type: CLEAR_DELTA_ACTION})
  }

  return (
    activeGame && isActive(activeGame) && !errors ? (
    <div>
        <div>
          {map && <Map
          province={activeGame.province}
          borderingTowns={selectedTowns.town1 && [...selectedTowns.town1.borderingTowns, selectedTowns.town1.name]}
          selectedTowns={[selectedTowns.town1, selectedTowns.town2]}
          geojson={map}
          onTownHover={handleHover} 
          onTownClick={handleClick} 
          currentUser={currentUser}
          colors={colors}
           />}

            <div className='actionsInfo'>
              <ActionsInfo 
                isMyTurn={isMyTurn(activeGame, currentUser.id)}
                hoveringTown={town}
                isMyTown={town && isMyTown(town, currentUser.id)}
                selectedTown={selectedTowns.town1}
                isAttack={selectedTowns.town1 && town && !isMyTown(town, currentUser.id)}
                />
            </div>

            <div className='townInfo'>
              <TownActions
                hoveredTown={town && townWithOwner(town, activeGame.playerIds)} 
                selectedTowns={selectedTowns}
                currentUser={currentUser.id}
                currentGame={activeGame}
                onChange={handleReturn}
                />
            </div>

            <div className='playersInfo'>
              <Players
                players={activeGame.playerIds}
                currentUser={currentUser.id}
                turn={activeGame.turnId}
                colors={colors}
              />
            </div>
          
        <div className=' d-flex justify-content-center col-6'>
          <Button color='danger' className='surrender' onClick={showModal}>Surrender</Button>
        </div>
            {showAttackResult ? <BattleResult display={showActionMessage} onClose={clearDeltaAction} selectedTowns={[selectedTowns.town1, selectedTowns.town2]}/>
            : showActionMessage && <ActionResult show={showActionMessage} onClose={clearDeltaAction}/>}
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
        
    ) : ( !!errors ? <SweetAlert
      info
      title="There was an error with your action!"
      onConfirm={() => getActualGame()}
      onCancel={() => getActualGame()}
      // timeout={2000}
      show
    >{errors}</SweetAlert> : <SweetAlert
      info
      title="The game ended!"
      onConfirm={() => redirect()}
      onCancel={() => redirect()}
      // timeout={2000}
      show
            ></SweetAlert> )
    
  )
}

export default Game;
