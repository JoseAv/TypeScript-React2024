import { create } from "zustand";
import { Questions } from '../Util/Question'
import { type typeUseQuetions } from '../types/TypesQuestions'
import { ChangeEvent, FormEvent } from "react";



export const useQuestions = create<typeUseQuetions>((set, get) => {


    return {
        FetchQuestions: [],
        Questions: [],
        Value: { Value1: '0', Value2: '0', Value3: '0', Value4: '0', },
        alert: false,
        totalPoints: 1000,
        point: 1000,
        showResult: false,
        Correct: 5,


        async RequestQuestions() {
            try {
                const NewQuestions = await Questions()
                set({ FetchQuestions: NewQuestions })
            } catch (err) {
                console.log(err)
            }
        },

        randomQuestions() {
            const { FetchQuestions, randomQuestions, Questions } = get()

            if (FetchQuestions.length === 0 || Questions.length >= 12) return;

            const newNumber = Math.floor(Math.random() * FetchQuestions.length); // daba error porque habian 45 preguntas pero hay 
            const ValidateNumber = Questions.find(quest => quest.id === newNumber); // 0 - 44 en el array si sacaba 45 no encontraba la pregunta en el array


            if (FetchQuestions.length > 0) {
                if (!ValidateNumber && newNumber <= 44) {
                    set({ Questions: [...Questions, FetchQuestions[newNumber]] })
                } else {
                    randomQuestions();
                }
            }
        },

        handleValues(e: ChangeEvent<HTMLInputElement>) {
            const { handlePoint, totalPoints } = get()
            const { name, value } = e.target
            const cleanedValue = value.replace(/^0+(?=\d)/, '')

            const IntNumber = Number.isInteger(+value)

            if (!IntNumber) return
            if (+value > totalPoints) return

            const ValueCount: number = handlePoint()


            const { Value } = get()
            const { Value1, Value2, Value3, Value4 } = Value

            if (ValueCount <= 0) {


                if (+value < +Value1 && name === 'Value1') {
                    set({ Value: { ...Value, [name]: cleanedValue } })

                }

                if (+value < +Value2 && name === 'Value2') {
                    set({ Value: { ...Value, [name]: cleanedValue } })

                }

                if (+value < +Value3 && name === 'Value3') {
                    set({ Value: { ...Value, [name]: cleanedValue } })

                }

                if (+value < +Value4 && name === 'Value4') {
                    set({ Value: { ...Value, [name]: cleanedValue } })

                }


                return

            }

            set({ Value: { ...Value, [name]: cleanedValue } })
        },

        ResetValues() {
            set({
                Value: { Value1: '0', Value2: '0', Value3: '0', Value4: '0', }
            })
        },

        handlendSubmit(e: FormEvent<HTMLFormElement>, count: number) {
            e.preventDefault()
            const { point } = get()
            const { Questions } = get()
            const { Value } = get()
            if (point > 0) return set({ alert: true })

            const FindCorrect = Questions[count].correcta
            set({ Correct: FindCorrect })

            if (FindCorrect === 0) {
                set({ totalPoints: +Value.Value1 })
            }
            if (FindCorrect === 1) {
                set({ totalPoints: +Value.Value2 })
            }
            if (FindCorrect === 2) {
                set({ totalPoints: +Value.Value3 })
            }
            if (FindCorrect === 3) {
                set({ totalPoints: +Value.Value4 })
            }

            set({ alert: false })
            set({ showResult: true })


        },

        handlePoint: () => {
            const { totalPoints } = get()
            let CountPoints = totalPoints
            const { Value } = get()
            const { Value1, Value2, Value3, Value4 } = Value
            CountPoints = CountPoints - +Value1 - +Value2 - +Value3 - +Value4
            if (CountPoints >= 0) {
                set({ point: CountPoints })
            }
            return CountPoints
        },
        setShowResult() {
            set({ showResult: false })
        },
        setCorrect() {
            set({ Correct: 5 })
        },
        resetGame() {
            set({
                FetchQuestions: [],
                Questions: [],
                Value: { Value1: '0', Value2: '0', Value3: '0', Value4: '0', },
                alert: false,
                totalPoints: 1000,
                point: 1000,
                showResult: false,
                Correct: 5,
            })
        }


    }






})