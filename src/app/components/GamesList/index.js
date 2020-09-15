import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import { HEADERS, INITIAL_VALUES, CHANGE_ARROW } from './constants';
import { compareValues, filterValues } from './utils';
import './Games.css'

function GamesList() {
  const [rowValues, setRowValues] = useState(INITIAL_VALUES);
  const [headers, setHeaders] = useState(HEADERS);

  function handleSearchChange(event) {
    return event.target.value ? setRowValues(filterValues(rowValues, event.target.value)) : setRowValues(INITIAL_VALUES);
  }

  function onHeaderClick(header) {
    setRowValues([...rowValues.sort((compareValues(header.key, header.nextOrder)))]);
    setHeaders(headers.map(aHeader => aHeader.id === header.id ? 
      {...header, nextOrder: !header.nextOrder, arrow: CHANGE_ARROW[header.arrow]} :
      {...aHeader, nextOrder: true, arrow: 'down'}
      ));
  }

  return (
    <div className='games-container'>
      <div className='games-inner'>
        <input 
          style={{margin: '5px 0'}} 
          className="form-control col-4" 
          type="text" 
          placeholder="Search" 
          aria-label="Search"
          onChange={handleSearchChange}
          />

        <Table striped>
          <thead>
            <tr>
              {headers.map(
              header => <th key={header.id} onClick={() => onHeaderClick(header)}>
                  <button className='header'>{header.value} <i className={`arrow ${header.arrow}`}></i></button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rowValues.map(
            rowValue => 
                <tr key={rowValue.id}>
                  <th scope='row'>{rowValue.id}</th>
                  {Object.keys(rowValue.data).map(key => <td key={rowValue.data[key]}>{rowValue.data[key]}</td>)}
                  <th>
                    { rowValue.data.status !== 'FINISHED' ? 
                    <Link to={`/game/${rowValue.id}`}>
                      <button className='btn btn-primary'>Play</button>
                    </Link>
                   : <button className='btn btn-primary'>See Statistics</button>
                   }
                   </th>
                </tr>
            )}
          </tbody>
        </Table>
        <Link to='/newGame'>
          <button className='btn btn-primary float-right'>Create new Game</button>
        </Link>
      </div>
    </div>
  );
}

export default GamesList;