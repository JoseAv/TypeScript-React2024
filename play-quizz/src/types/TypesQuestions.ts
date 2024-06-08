export interface TypeQuestions {
    id: number,
    pregunta: string,
    respuestas: string[],
    contestacion: string[],
    correcta: number,
    eleccion: answer | 0
}

export const answers = {
    respuesta1: 1,
    respuesta2: 2,
    respuesta3: 3,
    respuesta4: 4,
} as const

export type answer = typeof answers[keyof typeof answers]