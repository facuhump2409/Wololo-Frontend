import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import GauchosForm from './components/GauchosForm'
import AttackForm from './components/AttackForm'
import { getChangeSpecialization } from './utils'
import {updateSpecialization, attackTown, getTownStats} from '../../../../../services/games'
import {CHANGE_SPECIALIZATION, ATTACK_TOWN, TOWN_STATS} from '../../../../../redux/actionTypes'
import TownModal from "../../../Modals/townModal";
import { isMyTown } from '../../utils'

function TownInfo({ town, style, onSpecializationChange, selectedTowns, currentUser }) {
  const dispatch = useDispatch()

  const handleChangeSpecialization = (aTown, specialization) => {
    dispatch({ type: CHANGE_SPECIALIZATION, payload: updateSpecialization(1004, aTown.id, specialization) })
    onSpecializationChange()
  }

  return (
  <Card style={style}>
    <CardBody>
      {selectedTowns.town1 && (
      <div>
      <CardTitle>{selectedTowns.town1.name}</CardTitle>
      <CardText>Owner: {selectedTowns.town1.ownerId}</CardText>
      <CardText>Coordinates: LATITUDE {selectedTowns.town1.coordinates.lat}, LONGITUDE {selectedTowns.town1.coordinates.lon}</CardText>
      <CardText>gauchos quantity: {selectedTowns.town1.gauchos}</CardText>
      { isMyTown(selectedTowns.town1, currentUser) && <CardText>is locked: {selectedTowns.town1.isLocked.toString()}</CardText>}
      { isMyTown(selectedTowns.town1, currentUser) && (
          <Button 
            color='info' 
            onClick={() => handleChangeSpecialization(selectedTowns.town1, getChangeSpecialization[selectedTowns.town1.specialization])}
            >
            Change Specialization to {getChangeSpecialization[selectedTowns.town1.specialization].toLowerCase()}
            </Button>) 
          }
      <CardText>---------------------------</CardText>
      </div>
      )
      }
      <CardTitle>{town.name}</CardTitle>
      <CardText>Owner: {town.ownerId}</CardText>
      <CardText>Coordinates: LATITUDE {town.coordinates.lat}, LONGITUDE {town.coordinates.lon}</CardText>
      <CardText>gauchos quantity: {town.gauchos}</CardText>
      {isMyTown(town, currentUser) && <CardText>is locked: {town.isLocked.toString()}</CardText>}
    </CardBody>
  </Card>
  )
}

export default TownInfo