import { useEffect, useState } from 'react'
import { type TypeQuestions } from '../types/TypesQuestions'
import { useQuestions } from '../Store/Quizz'
import { LoserGame, WinGamer } from './LooserGame'

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
    const setCorrect = useQuestions((state) => state.setCorrect)
    const Correct = useQuestions((state) => state.Correct)


    function confirm() {
        ResetValues()
        if (count >= 11) {
            setCount(count + 1)
            return
        }

        setQuestion(Questions[count + 1])
        setCount(count + 1)
        setShowResult()
        setCorrect()
    }


    useEffect(() => {
        handlePoint()
    }, [Value, point, totalPoints])

    const correct = 'bg-green-300 text-black rounded-md text-wrap text-[25px] font-semibold px-1 w-full'
    const normal = 'bg-slate-300 text-black rounded-md text-wrap text-[25px] font-semibold px-1 w-full'

    return (

        <>
            {totalPoints <= 0 ? <LoserGame /> : count > 11 && totalPoints > 0 ? <WinGamer /> :
                <>
                    <h1 className='text-[60px] font-normal text-slate-200'>Puntos Ahora: <span className='font-semibold'>{showResult ? totalPoints : point}</span></h1>
                    <div className=' flex gap-5 justify-center items-center '>

                        <div className='border-4 border-gray p-2 rounded-xl bg-zinc-800 h-[450px] flex flex-col items-center w-[550px] '>
                            <div>
                                <h3 className=' text-[38px] p-0 font-bold text-neutral-300 '>Pregunta No. {count + 1}</h3>
                            </div>
                            <div className='w-full flex justify-center items-center mt-20 px-0.5'>
                                <p className='mt-3 text-neutral-100 font-normal text-[45px] text-balance leading-10'>{question.pregunta}</p>
                            </div>
                        </div>
                        <form onSubmit={(e) => handlendSubmit(e, count)} >


                            <div className=' flex gap-2  w-[550px] flex-col h-[350px] justify-between items-center'>


                                {question.respuestas.map((res, index) => {
                                    const name = index === 0 ? 'Value1' : index === 1 ? 'Value2' : index === 3 ? 'Value3' : 'Value4'
                                    const value = index === 0 ? Value.Value1 : index === 1 ? Value.Value2 : index === 3 ? Value.Value3 : Value.Value4
                                    return (
                                        <div className='flex w-full gap-3 items-center justify-center'>
                                            <div className='flex  w-[450px] '>
                                                <p className={Correct === index ? correct : normal}>A. {res}</p>
                                            </div>
                                            <div className='flex gap-8 flex-col w-[75px] font-semibold text-[25px]'>
                                                <input className='bg-slate-100 text-black rounded-md px-1' name={name} type="number" required min={0} onChange={handleValues} disabled={showResult} value={value} />
                                            </div>

                                        </div>

                                    )
                                })}





                                {!showResult ? <button className='bg-zinc-800 text-white w-[250px] rounded-xl text-[20px] font-semibold h-[35px] ' type="submit" >Responder</button> : ''}
                                {showResult ? <button className='bg-zinc-100 text-zinc-950 w-[250px] rounded-xl text-[20px] font-semibold h-[35px] ' onClick={() => confirm()}>Continuar</button> : ''}
                            </div>


                        </form>

                    </div>
                    <div className='flex w-full justify-center h-[50px] items-center'>


                        {alert === true ? <p className=' bg-red-600 text-white text-[30px] font-bold h-auto w-full rounded-lg'>Debe de gastar todos sus puntos</p> : ''}
                    </div>



                </>

            }


        </>




    )



}