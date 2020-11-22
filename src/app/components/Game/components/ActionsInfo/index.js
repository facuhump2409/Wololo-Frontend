import React from 'react'
import { Card, CardTitle } from 'reactstrap';
import { isBordered } from '../../utils';
import './index.css';

function ActionsInfo({ style, isMyTurn, hoveringTown, isMyTown, selectedTown, isAttack }) {

  return (
    <Card style={style}>
      <CardTitle className='text'>{!isMyTurn ? 'It is not your turn!' : 
      hoveringTown && (
        selectedTown ? (
          isBordered(hoveringTown, selectedTown) ? (
          isAttack ? 'Click to configure your attack!' : 'Click to move gauchos.'
        ) : 'You should select a bordering town' ) :
        isMyTown ? 'Click to change your specialization to Defense or Production, start configuring your attack or move gauchos.' : 
        'Before attacking, you should click one of your towns.'
      )}</CardTitle>
    </Card>
  )
}

export default ActionsInfo;
