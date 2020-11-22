import React from 'react';
import { COLORS } from '../../../../constants';

import './index.css'

function Players({ turn, currentUser, players, colors }) {
  return (
    <ul>
      {players.map(player => (
        <div className='playerContainer'>
          <span 
            className='dot' 
            style={{
              backgroundColor: currentUser === player.id ? COLORS.current : colors[player.id]
            }}
          />
          <li className={`font ${turn === player.id && 'itsTurn'}`}>{player.username}</li>
        </div>
        ))
      }
    </ul>
  )
}

export default Players;
