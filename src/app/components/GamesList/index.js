import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { HEADERS, INITIAL_VALUES } from './constants';
import { compareValues } from './utils';

function GamesList() {
  const [rowValues, setRowValues] = useState(INITIAL_VALUES);
  
  function onHeaderClick(header) {
    setRowValues([...rowValues.sort((compareValues(header, 'desc')))]);
    console.log(rowValues.sort((compareValues(header, 'desc'))));
  }

  return (
    <Table striped>
      <thead>
        <tr>
          {HEADERS.map(
            header => <th key={header} onClick={() => onHeaderClick(header)}>{header}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rowValues.map(
          rowValue => <tr key={rowValue.numero}>{Object.keys(rowValue).map(key => <td key={rowValue[key]}>{rowValue[key]}</td>)}</tr>
        )}
      </tbody>
    </Table>
  );
}

export default GamesList;