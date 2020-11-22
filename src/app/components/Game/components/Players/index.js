import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { COLORS } from '../../../../constants';
import { colorFor } from '../../utils';

import './index.css'

function Players({ turn, currentUser, players }) {
  return (
    <ul>
      {players.map(player => (
        <div className='playerContainer'>
          <span 
            className='dot' 
            style={{
              backgroundColor: currentUser === player.id ? COLORS.current : colorFor(player.id)
            }}
          />
          <li className={turn === player.id && 'itsTurn'}>{player.username}</li>
        </div>
        ))
      }
    </ul>
  )
}

export default Players;
