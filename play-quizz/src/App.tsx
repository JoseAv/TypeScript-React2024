import './App.css'
import { useQuestions } from './Store/Quizz'
import { ShowQuestions } from './ShowQuestios/Show'
import { type TypeQuestions } from './types/TypesQuestions'
import { useState, useEffect } from 'react'

function App() {
  const Questions = useQuestions((state) => state.Questions)
  const RequestQuestions = useQuestions((state) => state.RequestQuestions)
  const [raffle, setRaffle] = useState<TypeQuestions[] | []>([])




  const randomQuestions = () => {
    if (Questions.length === 0 || raffle.length >= 12) return;

    const newNumber = Math.floor(Math.random() * Questions.length); // daba error porque habian 45 preguntas pero hay 
    const ValidateNumber = raffle.find(quest => quest.id === newNumber); // 0 - 44 en el array si sacaba 45 no encontraba la pregunta en el array

    if (!ValidateNumber && newNumber <= 44) {
      setRaffle(prev => [...prev, Questions[newNumber]]);
    } else {
      randomQuestions();
    }
  };



  useEffect(() => {
    if (raffle.length < 12) {
      randomQuestions();
    }
  }, [Questions, raffle])



  return (
    <>


      {raffle.length > 0 ?
        <ShowQuestions Questions={raffle} /> :
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
