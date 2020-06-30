import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h3>
        {props.course.name}
      </h3>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
      <li>
        {part} {exercises}
      </li>
  )
}

const Content = (props) => {
  const parts = props.parts.map(part =>
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  )
  return (
    <div>
      <ul>
        {parts}
      </ul>
    </div>
  )
}

const Total = (props) => {
  const exercises = props.course.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = exercises.reduce(reducer)


  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
       <Header course={props.course}/>
       <Content parts={props.course.parts} />
       <Total key={props.course.id} course={props.course} />
  </div>

  )
}

export default Course