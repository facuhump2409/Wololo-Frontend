import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import { HEADERS, CHANGE_ARROW } from './constants';
import { compareValues, filterValues, mapGames } from './utils';
import './Games.css'
import {trackPromise} from "react-promise-tracker";
import {CLEANUP_GAME, GET_GAME, GET_GAMES, LOGIN, LOGIN_PAGE_LOADED, LOGIN_PAGE_UNLOADED} from "../../../redux/actionTypes";
import {login} from "../../../services/auth";
import { getGames } from "../../../services/games";
import {connect, useDispatch} from "react-redux";
import ErrorMessage from '../errorMessage';
import LoadingIndicator from '../../loadingIndicator';

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) =>
      trackPromise(dispatch({ type: LOGIN, payload: login(values) })),
  onUnload: () =>
      dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onLoad: () =>
      dispatch({type: LOGIN_PAGE_LOADED})
});

const mapStateToProps = state => ({ ...state.games });

function GamesList(props) {

  const mappedGames = mapGames(props.games)
  const dispatch = useDispatch()
  const [rowValues, setRowValues] = useState(mappedGames);
  const [headers, setHeaders] = useState(HEADERS);

  useEffect(() => {
    dispatch({ type: GET_GAMES, payload: getGames() });
    dispatch({ type: CLEANUP_GAME })
  }, [dispatch] )

  useEffect(() => {
    if(!props.inProgress) setRowValues(mapGames(props.games));
  }, [props])

  function handleSearchChange(event) {
    return event.target.value ? setRowValues(filterValues(rowValues, event.target.value)) : setRowValues(mappedGames);
  }

  function onHeaderClick(header) {
    setRowValues([...rowValues.sort((compareValues(header.key, header.nextOrder)))]);
    setHeaders(headers.map(aHeader => aHeader.id === header.id ? 
      {...header, nextOrder: !header.nextOrder, arrow: CHANGE_ARROW[header.arrow]} :
      {...aHeader, nextOrder: true, arrow: 'down'}
      ));
  }

  function handlePlayClick(event) {
    return dispatch({ type: GET_GAME, payload: props.games.find(aGame => aGame.id === parseInt(event.target.value)) })
  }

  return (
    <div className='games-container'>
      {props.inProgress ? (<LoadingIndicator display={true}/>) : (props.errors ? (<ErrorMessage errors={props.errors} />) : (
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
                    { ['FINISHED', 'CANCELED'].every(status => status !== rowValue.data.status) ? 
                    <Link to={`/game/${rowValue.id}`}>
                      <button className='btn btn-primary' value={rowValue.id} onClick={handlePlayClick}>Play</button>
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
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
