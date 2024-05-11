import React,{useState} from 'react'
import axios from 'axios'
import "../styles/questionsBar.css"
import QuestionCard from './QuestionCard'
const Question = () => {
    const [topic, setTopic] = useState('');
    const [question,setQuestions] = useState([]);
    const [error,setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e)=>{
        setTopic(e.target.value);
        setQuestions([]);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(true);
        console.log(topic);
        setLoading(true);
        try {
            const response = await axios.post('https://trivia-genrator.onrender.com/v1/api/trivia' , { "topic":topic });
            const responseQ = JSON.parse(response.data.ParsableJsonQ)
            setQuestions(responseQ);
            console.log(question);
            setError('');
          } catch (error) {
            console.error('Error fetching trivia questions please try again:', error);
            setError('Failed to fetch trivia questions. Please try again.');
          } finally{
            setLoading(false);
          }
    }
  return (
    <>
    <div className='question-tab'>
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Enter a topic...'
            value={topic}
            onChange={handleChange}
            >
            </input>
            <button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Generate Trivia'}</button>
        </form>
        </div>
        <div className='Questions'>
        {error && <p>{error}</p>}
      {Object.keys(question).length > 0 && (
          <QuestionCard data={question}/>
          )}
        </div>
        </>
    
  )
}

export default Question