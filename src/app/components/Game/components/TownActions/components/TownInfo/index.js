import React from 'react';
import { CardText, CardTitle } from 'reactstrap'
import { isMyTown } from '../../../../utils'

function TownInfo({ town, selectedTown, hide, currentUser }) {
  return town && !hide && (
  <div>
    <CardTitle>{town.name}</CardTitle>
    <CardText>Owner: {town.ownerId}</CardText>
    <CardText>Coordinates: LATITUDE {town.coordinates.lat}, LONGITUDE {town.coordinates.lon}</CardText>
    <CardText>gauchos quantity: {town.gauchos}</CardText>
    {isMyTown(town, currentUser) && <CardText>is locked: {town.isLocked.toString()}</CardText>}
  </div>
  )
}

export default TownInfo