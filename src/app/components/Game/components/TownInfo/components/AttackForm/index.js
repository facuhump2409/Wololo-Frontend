import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Form, Input, Button, FormFeedback } from 'reactstrap'
import { ATTACK_TOWN } from '../../../../../../../redux/actionTypes'
import { attackTown } from '../../../../../../../services/games'

function AttackForm({ currentGame, currentTown, currentUserTowns, onBack, onAttack }) {
  const dispatch = useDispatch();

  const [selectedTown, setSelectedTown] = useState(null);

  const handleSelectTown = (event) => {
    setSelectedTown(currentUserTowns.find(town => town.id === parseInt(event.target.value)))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!selectedTown) return;
    dispatch({ type: ATTACK_TOWN, payload: attackTown(currentGame.id, selectedTown.id, currentTown.id) })
    onAttack();
  }

  return (
    <Form style={{marginTop: '10px'}} onSubmit={handleSubmit}>
      <Input type='select' name='select' onChange={handleSelectTown} placeholder='Select Town' invalid={!selectedTown}>
        {currentUserTowns.map(town => town.id === currentTown.id ? <div/> : <option value={town.id}>{town.name}</option>)}
      </Input>
      <FormFeedback>Please select a Town</FormFeedback>
      <div className='d-flex justify-content-around' style={{marginTop: '10px'}}>
        <Button color='danger' onClick={onBack}>Back</Button>
        <Button color='primary' type='submit'>attack</Button>
      </div>
    </Form>
  )
}

export default AttackForm