import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
      <p>
      <button onClick={props.handler}>{props.buttonName}</button>
      </p>
  )
}





const App = (props) => {
  const [randomNmbr, setRandom] = useState(0)
  const [vote, setVote] = useState(props.anecdotess.map(el => 0))

  const handeClick = () => {
    setRandom(Math.floor(Math.random() * 6))
  }

  const handeVote = () => {
    const votes = vote
    votes[randomNmbr] += 1
    setVote([ ...votes ])
  }

  return (
    <div>
      <h1>
       Anecdote of the day
      </h1>
      {props.anecdotess[randomNmbr]}
      <br></br>
      Has {vote[randomNmbr]} votes
      <Button handler={handeVote}buttonName={"vote"}></Button>
      <Button handler={handeClick}buttonName={"next anecdote"}></Button>
      <h1>
       Anecdote with most votes
      </h1>
      {props.anecdotess[vote.indexOf(Math.max(...vote))]}
      <br></br>
      Has {Math.max(...vote)} votes
    </div>
  )
}

const anecdotess = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotess={anecdotess} />,
  document.getElementById('root')
)
