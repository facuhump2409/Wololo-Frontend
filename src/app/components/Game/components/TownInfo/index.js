import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import GauchosForm from './components/GauchosForm'
import AttackForm from './components/AttackForm'
import { getChangeSpecialization } from './utils'
import { updateSpecialization, attackTown } from '../../../../../services/games'
import { CHANGE_SPECIALIZATION, ATTACK_TOWN } from '../../../../../redux/actionTypes'

function TownInfo({ activeGame, town, currentUserTowns, clicked, onReturn, currentUser }) {
  const dispatch = useDispatch();
  
  const [movingGauchos, setMovingGauchos] = useState(false);
  const [attacking, setAttacking] = useState(false);

  const isTownFromUser = currentUser === town.ownerId;

  const handleReturn = () => {
    setMovingGauchos(false);
    setAttacking(false);
    onReturn();
  }

  const handleMoveGauchos = () => {
    setMovingGauchos(!movingGauchos);
  }

  const handleChangeSpecialization = (specialization) => {
    dispatch({ type: CHANGE_SPECIALIZATION, payload: updateSpecialization(activeGame.id, town.id, specialization) })
    onReturn();
  }

  const handleAttack = () => {
    setAttacking(!attacking)
  }

  return (
  <Card>
    <CardImg top width='100%' src={town.imageUrl} alt='Town Image' />
    <CardBody>
      <CardTitle>{town.name}</CardTitle>
      <CardText>Owner: {town.ownerId}</CardText>
      <CardText>Coordinates: LATITUDE {town.coordinates.lat}, LONGITUDE {town.coordinates.lon}</CardText>
      <CardText>gauchos quantity: {town.gauchos}</CardText>
      {isTownFromUser ? <CardText>is locked: {town.isLocked.toString()}</CardText> : null}
      { clicked ? 
      <div className='d-flex justify-content-around'>
      <Button color='danger' onClick={handleReturn}>return</Button>
      { isTownFromUser ? (
        <div>
        <Button 
          color='info' 
          onClick={() => handleChangeSpecialization(getChangeSpecialization[town.specialization])}
          >
          Change Specialization to {getChangeSpecialization[town.specialization].toLowerCase()}
          </Button>

        {!town.isLocked ?
          <Button color='info' onClick={handleMoveGauchos}>add gauchos</Button> : null}
        </div>)
        : <Button color='primary' onClick={handleAttack}>attack</Button> 
        }
      </div>
      : null 
      }
      {
        movingGauchos ? (
          <GauchosForm 
            currentGame={activeGame} 
            currentTown={town} 
            currentUserTowns={currentUserTowns} 
            onBack={handleMoveGauchos} 
            onMoveGauchos={handleReturn}/>
      ) : null
      }
            {
        attacking ? (
          <AttackForm 
            currentGame={activeGame}
            currentTown={town} 
            currentUserTowns={currentUserTowns} 
            onBack={handleAttack} 
            onAttack={handleReturn}/>
      ) : null
      }
    </CardBody>
  </Card>
  )
}

export default TownInfo