import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
      <button onClick={props.handler}>{props.buttonName}</button>
  )

}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )


}

const Statistics = (props) => {

  let stats
  if (props.all === 0) {
    stats = <tr><td>No feedback given</td></tr>
  } else {
    stats =  
    [<StatisticLine text="good" value ={props.good}/>,
    <StatisticLine text="neutral" value ={props.neutral}/>,
    <StatisticLine text="bad" value ={props.bad}/>,
    <StatisticLine text="all" value ={props.all}/>,
    <StatisticLine text="average" value ={props.average}/>,
    <StatisticLine text="positive" value ={props.positive+"%"}/>]

  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
         {stats}
        </tbody>
      </table>
    </div>
  )


  

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
 



  const handeGoodClick = () => {
    setGood(good+1)
    setAll(all+1)
    setAverage((good - bad +1)/(all+1))
    setPositive((good+1)*100/(all+1))
  }

  const handeNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    setAverage((good - bad)/(all+1))
    setPositive((good)*100/(all+1))
  }

  const handeBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
    setAverage((good - bad - 1)/(all+1))
    setPositive((good)*100/(all+1))
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handeGoodClick}buttonName={"good"}></Button>
      <Button handler={handeNeutralClick}buttonName={"neutral"}></Button>
      <Button handler={handeBadClick}buttonName={"bad"}></Button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
