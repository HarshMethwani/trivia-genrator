import React from 'react'
import '../styles/questionCard.scss'
const QuestionCard = (props) => {
    const question = props.data
  return (
    <>
    <div class="card">
    <h2>Question 1</h2>
    <p>{question[0]}</p>
</div>
<div class="card">
    <h2>Question 2</h2>
    <p>{question[1]}</p>
</div>
<div class="card">
    <h2>Question 3</h2>
    <p>{question[2]}</p>
</div>
<div class="card">
    <h2>Question 4</h2>
    <p>{question[3]}</p>
</div>
<div class="card">
    <h2>Question 5</h2>
    <p>{question[4]}</p>
</div>
    </>
  )
}

export default QuestionCard