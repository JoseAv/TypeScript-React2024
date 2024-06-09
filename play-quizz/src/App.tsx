import './App.css'
import { useQuestions } from './Store/Quizz'
import { ShowQuestions } from './ShowQuestios/Show'
import { useEffect } from 'react'

function App() {
  const FetchQuestions = useQuestions((state) => state.FetchQuestions)
  const RequestQuestions = useQuestions((state) => state.RequestQuestions)
  const randomQuestions = useQuestions((state) => state.randomQuestions)
  const Questions = useQuestions((state) => state.Questions)


  


  useEffect(() => {
    if (Questions.length < 12) {
      randomQuestions();
    }
  }, [FetchQuestions, Questions])



  return (
    <>


      {Questions.length > 0 ?
        <ShowQuestions Questions={Questions} /> :
        <button onClick={() => {
          RequestQuestions()
          randomQuestions()
        }} >
          Empezar
        </button>}
    </>
  )
}

export default App
