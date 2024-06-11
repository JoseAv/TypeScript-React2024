import { ChangeEvent, FormEvent } from "react"

export interface TypeQuestions {
    id: number,
    pregunta: string,
    respuestas: string[],
    contestacion: string[],
    correcta: number,
    eleccion: number
}

export interface typeUseQuetions {
    FetchQuestions: TypeQuestions[] | [],
    RequestQuestions: () => void,
    Questions: TypeQuestions[] | [],
    randomQuestions: () => void,
    Value: Values,
    ResetValues: () => void,
    handleValues: (e: ChangeEvent<HTMLInputElement>) => void
    handlePoint: () => number
    alert: boolean
    totalPoints: number
    point: number
    showResult: boolean
    handlendSubmit: (e: FormEvent<HTMLFormElement>, count: number) => void
    setShowResult: () => void
    Correct: number
    setCorrect: () => void
    resetGame: () => void
}

export interface Values {
    Value1: string
    Value2: string
    Value3: string
    Value4: string
}

