import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { getChangeSpecialization, areSelectedAndRivals, areSelectedAndFriendlies, canMoveGauchos } from './utils'
import { updateSpecialization, attackTown, getTownStats, moveGauchos } from '../../../../../services/games'
import {CHANGE_SPECIALIZATION, ATTACK_TOWN, MOVE_GAUCHOS } from '../../../../../redux/actionTypes'
import TownInfo from './components/TownInfo'
import Slider from '@material-ui/core/Slider'
import CloseIcon from '@material-ui/icons/Close';
import { isMyTown } from '../../utils'

function TownActions({ hoveredTown, currentGame, style, onChange, onAttack, selectedTowns, currentUser }) {
  const dispatch = useDispatch()
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleChangeSpecialization = (aTown, specialization) => {
    dispatch({ type: CHANGE_SPECIALIZATION, payload: updateSpecialization(currentGame.id, aTown.id, specialization) })
    onChange()
  }

  const handleAttack = () => {
    dispatch({ type: ATTACK_TOWN, payload: attackTown(currentGame.id, selectedTowns.town1.id, selectedTowns.town2.id) })
    onChange()
  }

  const handleTownMove = () => {
    dispatch({ type: MOVE_GAUCHOS, payload: moveGauchos(currentGame.id, selectedTowns.town1.id, selectedTowns.town2.id, selectedQuantity) })
    onChange()
  }

  return (
  <Card style={style}>
    { selectedTowns.town1 && <CloseIcon onClick={onChange}/> }
    <CardBody>
      <TownInfo town={selectedTowns.town1} currentUser={currentUser} selectedTown/>
      { selectedTowns.town1 && !selectedTowns.town2 && isMyTown(selectedTowns.town1, currentUser) && (
          <Button 
            color='info' 
            onClick={() => handleChangeSpecialization(selectedTowns.town1, getChangeSpecialization[selectedTowns.town1.specialization])}
            >
            Change Specialization to {getChangeSpecialization[selectedTowns.town1.specialization].toLowerCase()}
            </Button>) 
      }
      { selectedTowns.town1 && <CardText>----------------------</CardText> }
      <TownInfo town={selectedTowns.town2} currentUser={currentUser} selectedTown />
      { areSelectedAndRivals(selectedTowns) && <Button color='primary' onClick={handleAttack} type='submit'>attack</Button> }
      { areSelectedAndFriendlies(selectedTowns) && <div>
        <Slider
          defaultValue={1}
          step={1}
          min={1}
          max={selectedTowns.town1.gauchos}
          marks
          onChange={(e, value) => setSelectedQuantity(value)}
          valueLabelDisplay="auto"
        />
        <Button color='primary' onClick={handleTownMove} type='submit'>Move Gauchos</Button>
        </div> 
      }
      <TownInfo town={hoveredTown} currentUser={currentUser} hide={selectedTowns.town1 && selectedTowns.town2}/>
    </CardBody>
  </Card>
  )
}

export default TownActions