import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Form, Input, Button, FormFeedback } from 'reactstrap'
import { MOVE_GAUCHOS } from '../../../../../../../redux/actionTypes'
import { moveGauchos } from '../../../../../../../services/games'

function GauchosForm({ currentGame, currentTown, currentUserTowns, onBack, onMoveGauchos }) {
  const dispatch = useDispatch();

  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [invalidQuantity, setInvalidQuantity] = useState(false);

  const handleSelectTown = (event) => {
    setSelectedTown(currentUserTowns.find(town => town.id === parseInt(event.target.value)))
  }

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value))
    setInvalidQuantity(selectedTown ? selectedTown.gauchos < parseInt(event.target.value) : false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(invalidQuantity || !selectedTown) return;
    dispatch({ type: MOVE_GAUCHOS, payload: moveGauchos(currentGame.id, selectedTown.id, currentTown.id, selectedQuantity) })
    onMoveGauchos();
  }

  return (
    <Form style={{marginTop: '10px'}} onSubmit={handleSubmit}>
      <Input type='select' name='select' onChange={handleSelectTown} placeholder='Select Town' invalid={!selectedTown}>
        {currentUserTowns.map(town => town.id === currentTown.id ? <div/> : <option value={town.id}>{town.name}</option>)}
      </Input>
      <FormFeedback>Please select a Town</FormFeedback>
      <Input 
        placeholder='Select Gauchos quantity'
        style={{marginTop: '10px', width: '100%'}} 
        type="number" 
        name="number" 
        invalid={invalidQuantity}
        onChange={handleQuantityChange}
        />
        <FormFeedback>The number of gauchos entered exceeds the number of gauchos that the town has: {selectedTown ? selectedTown.gauchos : 0}.</FormFeedback>
      <div className='d-flex justify-content-around' style={{marginTop: '10px'}}>
        <Button color='danger' onClick={onBack}>Back</Button>
        <Button color='primary' type='submit'>move</Button>
      </div>
    </Form>
  )
}

export default GauchosForm