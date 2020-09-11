import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { HEADERS, INITIAL_VALUES } from './constants';
import { compareValues } from './utils';

function GamesList() {
  const [rowValues, setRowValues] = useState(INITIAL_VALUES);
  const [headers, setHeaders] = useState(HEADERS);

  function onHeaderClick(header) {
    console.log(header.key);
    setRowValues([...rowValues.sort((compareValues(header.key, header.nextOrder)))]);
    setHeaders(headers.map(aHeader => aHeader.id === header.id ? {...header, nextOrder: !header.nextOrder} : aHeader))
  }

  return (
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
  );
}

export default GamesList;