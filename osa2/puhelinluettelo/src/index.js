
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'



const Persons = (props) => {
const person = props.list.map(person => 
<div key={person.number}>{person.name} {person.number} 
  <button onClick={props.handleDelete(person.id)}>delete</button>
</div>)
  return (
    <div>
      {person}
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

const Message = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
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
  const [successMessage, setSuccessMessage] = useState(null)
  const [failMessage, setFailMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setShownPersons(response.data)
      })
  }, [])


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


  const handleDelete = (id) => () => {
    const deletePerson = shownPersons.find(person => person.id === id)

    personService
    .delete(id)
    .then(() => {
      setSuccessMessage(`Deleted ${deletePerson.name}`)
      setPersons([ ...persons.filter(person => person.id !== id) ])
      setShownPersons([ ...persons.filter(person => person.id !== id)])
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
      setNewNumber('')
      setNewName('')
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (!persons.map(person => person.name).includes(newName)) {

      personService
      .create(personObject)
      .then(response => {
        const newPersons = [ ...persons, response.data ]
        setPersons(newPersons)
        setSuccessMessage('Added '+newName)

        if (newFilter.length === 0) setShownPersons(newPersons)
        else setShownPersons([ ...newPersons.filter(person => person.name.includes(newFilter)) ])

        setTimeout(() => {
          setSuccessMessage(null)
        },5000)
        setNewNumber('')
        setNewName('')
      })


    } else {
      const replace = window.confirm('name is already added to phonebook, replace the number with new one?')
      if (replace) {
        const updatedPerson = {
          ...persons.find(person => person.name === newName),
          number: newNumber
        }
        const updatedPersons = [ ...persons.filter(person => person.id !== updatedPerson.id), updatedPerson ]

        personService.update(
          updatedPerson.id, updatedPerson
        ).then(() => {
          setPersons(updatedPersons)
          setSuccessMessage('Changed number of '+newName)
          setTimeout(() => {
            setSuccessMessage(null)
          },5000)
          setNewNumber('')
          setNewName('')
        })
        .catch(error => {
          setFailMessage(`${newName} is already deleted`)
          setTimeout(() => {
            setFailMessage(null)
          },5000)
          setPersons([ ...persons.filter(person => person.id !== updatedPerson.id) ])
          setShownPersons([ ...persons.filter(person => person.id !== updatedPerson.id)])
          setNewNumber('')
          setNewName('')

        })

        if (newFilter.length === 0) setShownPersons(updatedPersons)
        else setShownPersons([ ...updatedPersons.filter(person => person.name.includes(newFilter)) ])

        }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={successMessage} className='success' />
      <Message message={failMessage} className='fail' />

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
      <Persons list={shownPersons} handleDelete={handleDelete}/>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
