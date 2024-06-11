import { useEffect, useState } from 'react'
import { type TypeQuestions } from '../types/TypesQuestions'
import { useQuestions } from '../Store/Quizz'

interface typesQuestions {
    Questions: TypeQuestions[]
}

export const ShowQuestions = ({ Questions }: typesQuestions) => {
    const [question, setQuestion] = useState<TypeQuestions>(Questions[0])
    const [count, setCount] = useState(0)

    const Value = useQuestions((state) => state.Value)
    const ResetValues = useQuestions((state) => state.ResetValues)
    const handleValues = useQuestions((state) => state.handleValues)
    const handlePoint = useQuestions((state) => state.handlePoint)
    const point = useQuestions((state) => state.point)
    const showResult = useQuestions((state) => state.showResult)
    const setShowResult = useQuestions((state) => state.setShowResult)
    const totalPoints = useQuestions((state) => state.totalPoints)
    const handlendSubmit = useQuestions((state) => state.handlendSubmit)
    const alert = useQuestions((state) => state.alert)


    function confirm() {
        ResetValues()
        if (count >= 11) return

        setQuestion(Questions[count])
        setCount(count + 1)
        setShowResult()
    }


    useEffect(() => {
        handlePoint()
    }, [Value, point, totalPoints])

    return (

        <>
            {totalPoints <= 0 ? <p className=' bg-red-400 text-white font-bold'>Juego Finalizado</p> :
                <>
                    <h1 className='text-[60px] font-bold text-slate-200'>Puntos Ahora: <span className=''>{showResult ? totalPoints : point}</span></h1>
                    <div className=' flex gap-5 '>
                        <div className='border-4 border-gray p-5 rounded-xl bg-gray-800 h-64 flex flex-col items-center w-[650px]'>
                            <h3 className=' text-[30px] p-0 font-semibold text-slate-300'>Pregunta No. {count + 1}</h3>
                            <p className=' text-xl mt-3 text-white font-medium text-[30px] text-balance leading-10'>{question.pregunta}</p>
                        </div>
                        <form onSubmit={(e) => handlendSubmit(e, count)} >


                            <div className=' flex gap-4 justify-center items-center w-[550px]'>

                                <div className='flex gap-2 flex-col'>
                                    <p>{question.respuestas[0]}</p>
                                    <p>{question.respuestas[1]}</p>
                                    <p>{question.respuestas[2]}</p>
                                    <p>{question.respuestas[3]}</p>
                                </div>

                                <div className='flex gap-2 flex-col'>
                                    <input className='bg-white text-black text-center' name='Value1' type="number" required min={0} onChange={(e) => handleValues(e)} disabled={showResult} value={Value.Value1} />
                                    <input name='Value2' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value2} />
                                    <input name='Value3' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value3} />
                                    <input name='Value4' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value4} />
                                </div>


                            </div>

                            {!showResult ? <button className='bg-white text-black' type="submit" >Responder</button> : ''}
                        </form>

                    </div>
                    <div>

                        {showResult ? <button onClick={() => confirm()}>Siguiente</button> : ''}
                        {alert === true ? <p className=' bg-red-400 text-white font-bold'>Debe de Gastar Todos sus puntos</p> : ''}
                    </div>



                </>

            }


        </>




    )



}