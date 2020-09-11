import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { HEADERS, INITIAL_VALUES } from './constants';
import { compareValues, filterValues } from './utils';

function GamesList() {
  const [rowValues, setRowValues] = useState(INITIAL_VALUES);
  const [headers, setHeaders] = useState(HEADERS);

  function handleSearchChange(event) {
    return event.target.value ? setRowValues(filterValues(rowValues, event.target.value)) : setRowValues(INITIAL_VALUES);
  }

  function onHeaderClick(header) {
    setRowValues([...rowValues.sort((compareValues(header.key, header.nextOrder)))]);
    setHeaders(headers.map(aHeader => aHeader.id === header.id ? {...header, nextOrder: !header.nextOrder} : aHeader))
  }

  return (
    <div>
      <input 
        style={{margin: '5px 0'}} 
        className="form-control col-6" 
        type="text" 
        placeholder="Search" 
        aria-label="Search"
        onChange={handleSearchChange}
        />

      <Table striped>
        <thead>
          <tr>
            {headers.map(
             header => <th key={header.id} onClick={() => onHeaderClick(header)}>{header.value}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rowValues.map(
           rowValue => 
           <tr key={rowValue.id}>
              <th scope='row'>{rowValue.id}</th>
              {Object.keys(rowValue.data).map(key => <td key={rowValue.data[key]}>{rowValue.data[key]}</td>)}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default GamesList;