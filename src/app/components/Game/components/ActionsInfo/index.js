import React from 'react'
import { Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';

import './index.css';

function ActionsInfo({ style, isMyTurn, isHoveringTown, isMyTown, hasSelectedTown, isAttack }) {

  return (
    <Card style={style}>
      <CardTitle className='text'>{!isMyTurn ? 'It is not your turn!' : 
      isHoveringTown && (
        hasSelectedTown ? (
          isAttack ? 'Click to configure your attack!' : 'Click to move gauchos.'
        ) : isMyTown ? 'Click to change your specialization to Defense or Production, start configuring your attack or move gauchos.' :
        'Before attacking, you should click one of your towns.'
      )}</CardTitle>
    </Card>
  )
}

export default ActionsInfo;
