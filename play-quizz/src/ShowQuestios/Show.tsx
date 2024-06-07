import { useEffect, useRef, useState } from 'react'
import { type TypeQuestions } from '../types/TypesQuestions'

interface typesQuestions {
    Questions: TypeQuestions[]
}

export const ShowQuestions = ({ Questions }: typesQuestions) => {
    const [question, setQuestion] = useState<TypeQuestions>(Questions[0])
    const [count, setCount] = useState(1)
    const [totalPoints, setTotal] = useState(1000)
    const [point, setpoin] = useState(totalPoints)
    const [Value1, setValue1] = useState('0')
    const [Value2, setValue2] = useState('0')
    const [Value3, setValue3] = useState('0')
    const [Value4, setValue4] = useState('0')



    console.log(point)


    function confirm() {
        setTotal(point)
        setValue1('0')
        setValue2('0')
        setValue3('0')
        setValue4('0')
        if (count >= 12) return

        setQuestion(Questions[count])
        setCount(count + 1)
    }


    useEffect(() => {
        let CountPoints = totalPoints
        CountPoints = CountPoints - +Value1 - +Value2 - +Value3 - +Value4
        setpoin(CountPoints)




    }, [Value1, Value2, Value3, Value4, point])

    return (
        <>
            <h1>Puntos Ahora {point}</h1>
            <div className=' flex gap-2 '>
                <div>
                    <p className=' text-3xl'>{question.id}.</p>
                    <p className=' text-xl'>{question.pregunta}</p>
                </div>
                <div className=' flex flex-col gap-3'>
                    <input type="number" required max={point} onChange={(e) => setValue1(e.target.value)} value={Value1} />
                    <input type="number" required max={point} onChange={(e) => setValue2(e.target.value)} value={Value2} />
                    <input type="number" required max={point} onChange={(e) => setValue3(e.target.value)} value={Value3} />
                    <input type="number" required max={point} onChange={(e) => setValue4(e.target.value)} value={Value4} />
                    <button type="submit" >Responder</button>
                </div>


                <div>

                </div>
            </div>
            <div>
                <button onClick={() => confirm()}>Confirmar</button>
            </div>



        </>


    )



}