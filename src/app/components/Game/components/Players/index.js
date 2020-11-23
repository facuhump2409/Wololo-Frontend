import React from 'react';
import { COLORS } from '../../../../constants';

import './index.css'

function Players({ turn, currentUser, players, colors }) {
  const isCurrentUser = (player) => currentUser === player.id
  const isItsTurn = (player) => turn === player.id
  return (
    <ul>
      {players.map(player => (
        <div className='playerContainer'>
          <span 
            className='dot' 
            style={{
              backgroundColor: isCurrentUser(player) ? COLORS.current : colors[player.id],
              opacity: isItsTurn(player) ? 1 : 0.3
            }}
          />
          <li className={`font ${isItsTurn(player) && 'itsTurn'}`}>{`${player.username}${isCurrentUser(player) ? ' (you)' : ''}`}</li>
        </div>
        ))
      }
    </ul>
  )
}

export default Players;
