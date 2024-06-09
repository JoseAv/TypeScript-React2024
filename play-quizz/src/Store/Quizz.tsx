import { create } from "zustand";
import { Questions } from '../Util/Question'
import { type TypeQuestions } from '../types/TypesQuestions'

interface typeUseQuetions {
    FetchQuestions: TypeQuestions[] | [],
    RequestQuestions: () => void,
    Questions: TypeQuestions[] | [],
    randomQuestions: () => void
}


export const useQuestions = create<typeUseQuetions>((set, get) => {


    return {
        FetchQuestions: [],
        Questions: [],

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


    }




})