
import ReactDOM from 'react-dom'
import React, { useState } from 'react'


const Persons = (props) => {
  const name = props.list.map(person => <div key={person.number}>{person.name} {person.number}</div>)
  return (
    <div>
      {name}
    </div>
  )
}

const Input = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <input 
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

const FormAddPerson = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Input text='name:' value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        <Input text='number:' value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const list = [
    {
      name: '',
      number: ''
    }
  ]

  const [ persons, setPersons] = useState(list)
  const [ shownPersons, setShownPersons ] = useState(list)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    if (event.target.value.length === 0) setShownPersons([ ...persons ])
    else setShownPersons([ ...persons.filter(person => person.name.includes(event.target.value)) ])
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const newPersons = [ ...persons, personObject ]

    if (!persons.map(person => person.name).includes(newName)){
      setPersons(newPersons)
      setNewNumber('')
      setNewName('')
    } else {
      window.alert('name is already included')
    }

    if (newFilter.length === 0) setShownPersons(newPersons)
    else setShownPersons([ ...newPersons.filter(person => person.name.includes(newFilter)) ])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Input text='find name' value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h3>Add new</h3>
        <FormAddPerson onSubmit={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons list={shownPersons}/>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
