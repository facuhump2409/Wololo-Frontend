import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import GauchosForm from './components/GauchosForm'

function TownInfo({ town, currentUserTowns, clicked, onReturn, currentUser }) {
  const [movingGauchos, setMovingGauchos] = useState(false);

  const handleReturn = () => {
    setMovingGauchos(false);
    onReturn();
  }

  const handleMoveGauchos = () => {
    setMovingGauchos(!movingGauchos);
  }

  const moveGauchos = () => {
  }

  return (
  <Card>
    <CardImg top width='100%' src={town.imageUrl} alt='Town Image' />
    <CardBody>
      <CardTitle>{town.name}</CardTitle>
      <CardText>Owner: {town.ownerId}</CardText>
      <CardText>Coordinates: LATITUDE {town.coordinates.lat}, LONGITUDE {town.coordinates.lon}</CardText>
      <CardText>gauchos quantity: {town.gauchos}</CardText>
      <CardText>is locked: {town.isLocked.toString()}</CardText>
      { clicked ? 
      <div className='d-flex justify-content-around'>
      <Button color='danger' onClick={handleReturn}>return</Button>
      {currentUser === town.ownerId ? <Button color='info' onClick={handleMoveGauchos}>add gauchos</Button> : <Button color='primary'>attack</Button> }
      </div>
      : null 
      }
      {
        movingGauchos ? (
          <GauchosForm currentTown={town} currentUserTowns={currentUserTowns} onBack={handleMoveGauchos} onMoveGauchos={moveGauchos}/>
      ) : null
      }
    </CardBody>
  </Card>
  )
}

export default TownInfo