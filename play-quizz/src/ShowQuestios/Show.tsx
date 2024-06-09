import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { type TypeQuestions } from '../types/TypesQuestions'

interface typesQuestions {
    Questions: TypeQuestions[]
}

export const ShowQuestions = ({ Questions }: typesQuestions) => {
    const [question, setQuestion] = useState<TypeQuestions>(Questions[0])
    const [count, setCount] = useState(0)
    const [totalPoints, setTotal] = useState(1000)
    const [point, setpoin] = useState(totalPoints)
    const [Value, setValue] = useState({
        Value1: '0',
        Value2: '0',
        Value3: '0',
        Value4: '0',
    })
    const [showResult, setShowResult] = useState(false)
    const [alert, setAlert] = useState(false)


    function handleValues(e: ChangeEvent<HTMLInputElement>) {
        handlePoint()
        const { name, value } = e.target
        const cleanedValue = value.replace(/^0+(?=\d)/, '')
        const IntNumber = Number.isInteger(+value)

        if (!IntNumber) return
        if (+value > totalPoints) return
        const ValueCount = handlePoint()



        if (ValueCount <= 0) {
            const { Value1, Value2, Value3, Value4 } = Value

            if (+value < +Value1 && name === 'Value1') {
                console.log('entra aqui')
                setValue(prev => ({
                    ...prev,
                    [name]: cleanedValue
                }))

            }

            if (+value < +Value2 && name === 'Value2') {
                console.log('entra aqui')
                setValue(prev => ({
                    ...prev,
                    [name]: cleanedValue
                }))

            }

            if (+value < +Value3 && name === 'Value3') {
                setValue(prev => ({
                    ...prev,
                    [name]: cleanedValue
                }))

            }

            if (+value < +Value4 && name === 'Value4') {
                console.log('entra aqui')
                setValue(prev => ({
                    ...prev,
                    [name]: cleanedValue
                }))

            }


            return

        }

        setValue(prev => ({
            ...prev,
            [name]: cleanedValue
        }))
    }

    function handlendSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (point > 0) return setAlert(true)

        const FindCorrect = Questions[count].correcta
        if (FindCorrect === 1) {
            setTotal(+Value.Value1)
        }
        if (FindCorrect === 2) {
            setTotal(+Value.Value2)
        }
        if (FindCorrect === 3) {
            setTotal(+Value.Value3)
        }
        if (FindCorrect === 4) {
            setTotal(+Value.Value4)
        }

        setAlert(false)
        setShowResult(true)


    }



    function confirm() {


        setValue({
            Value1: '0',
            Value2: '0',
            Value3: '0',
            Value4: '0',
        })

        if (count >= 11) return

        setQuestion(Questions[count])
        setCount(count + 1)
        setShowResult(false)
    }


    const handlePoint = () => {
        let CountPoints = totalPoints
        const { Value1, Value2, Value3, Value4 } = Value
        CountPoints = CountPoints - +Value1 - +Value2 - +Value3 - +Value4
        if (CountPoints >= 0) {
            setpoin(CountPoints)
        }
        return CountPoints
    }

    useEffect(() => {
        handlePoint()

    }, [Value, point, totalPoints])

    return (

        <>
            {totalPoints <= 0 ? <p className=' bg-red-400 text-white font-bold'>Juego Finalizado</p> :
                <>
                    <h1>Puntos Ahora {showResult ? totalPoints : point}</h1>
                    <div className=' flex gap-2 '>
                        <div>
                            <p className=' text-3xl'>{question.id}.</p>
                            <p className=' text-xl'>{question.pregunta}</p>
                        </div>
                        <form onSubmit={handlendSubmit}>
                            <div className=' flex flex-col gap-3 justify-center items-center'>
                                <input name='Value1' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value1} />
                                <input name='Value2' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value2} />
                                <input name='Value3' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value3} />
                                <input name='Value4' type="number" required min={0} onChange={handleValues} disabled={showResult} value={Value.Value4} />
                                {!showResult ? <button type="submit" >Responder</button> : ''}

                            </div>
                        </form>


                        <div>

                        </div>
                    </div>
                    <div>

                        {showResult ? <button onClick={() => confirm()}>Siguiente</button> : ''}
                        {alert ? <p className=' bg-red-400 text-white font-bold'>Debe de Gastar Todos sus puntos</p> : ''}
                    </div>



                </>

            }


        </>




    )



}