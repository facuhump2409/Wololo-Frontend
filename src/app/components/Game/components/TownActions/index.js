import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { getChangeSpecialization, areSelectedAndRivals } from './utils'
import {updateSpecialization, attackTown, getTownStats} from '../../../../../services/games'
import {CHANGE_SPECIALIZATION, ATTACK_TOWN, TOWN_STATS} from '../../../../../redux/actionTypes'
import TownInfo from './components/TownInfo'
import { isMyTown } from '../../utils'

function TownActions({ hoveredTown, currentGame, style, onChange, onAttack, selectedTowns, currentUser }) {
  const dispatch = useDispatch()

  const handleChangeSpecialization = (aTown, specialization) => {
    dispatch({ type: CHANGE_SPECIALIZATION, payload: updateSpecialization(currentGame, aTown.id, specialization) })
    onChange()
  }

  const handleAttack = () => {
    dispatch({ type: ATTACK_TOWN, payload: attackTown(currentGame, selectedTowns.town1.id, selectedTowns.town2.id) })
    onChange()
  }

  return (
  <Card style={style}>
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
      <TownInfo town={hoveredTown} currentUser={currentUser} hide={selectedTowns.town1 && selectedTowns.town2}/>
    </CardBody>
  </Card>
  )
}

export default TownActions