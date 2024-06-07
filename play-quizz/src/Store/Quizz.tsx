import { create } from "zustand";
import { Questions } from '../Util/Question'
import { type TypeQuestions } from '../types/TypesQuestions'

interface typeUseQuetions {
    Questions: TypeQuestions[] | [],
    RequestQuestions: () => void
}


export const useQuestions = create<typeUseQuetions>((set) => {


    return {
        Questions: [],

        async RequestQuestions() {
            try {
                const NewQuestions = await Questions()
                set({ Questions: NewQuestions })
            } catch (err) {
                console.log(err)
            }
        }

    }




})