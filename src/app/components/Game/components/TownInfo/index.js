import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function TownInfo({ town }) {
  return (
  <Card>
    <CardImg top width='100%' src={process.env.PUBLIC_URL + '/villa_crespo.jpeg'} alt='Town Image' />
    <CardBody>
      <CardTitle>{town.name}</CardTitle>
      <CardText>Owner: {town.owner.username}</CardText>
      <CardText>Coordinates: LATITUDE {town.coordinates.lat}, LONGITUDE {town.coordinates.lon}</CardText>
      <CardText>gauchos quantity: {town.gauchos}</CardText>
      <CardText>is locked: {town.isLocked.toString()}</CardText>
    </CardBody>
  </Card>
  )
}

export default TownInfo