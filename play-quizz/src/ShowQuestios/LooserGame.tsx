import { useQuestions } from "../Store/Quizz"

export function LoserGame() {

    const resetGame = useQuestions((state) => state.resetGame)
    const Loser = " text-[60px] font-extrabold"
    return (
        <>
            <div className="h-[300px] w-[600px] bg-red-600 rounded-3xl text-stone-50 ">

                <p className={Loser}>
                    Lo Sentimos,
                </p>
                <p className={Loser}>
                    Haz Perdido
                </p>

                <button onClick={resetGame} className="text-[40px] font-bold border-2 border-black mt-4 bg-stone-200 px-3 rounded-md text-black">Jugar de nuevo :)</button>

            </div>


        </>

    )

}


export function WinGamer() {

    const resetGame = useQuestions((state) => state.resetGame)
    const Loser = " text-[60px] font-extrabold"
    return (
        <>
            <div className="h-[300px] w-[600px] bg-green-800 rounded-3xl text-stone-50 ">

                <p className={Loser}>
                    Haz Ganado,
                </p>
                <p className={Loser}>
                    Enhorabuena
                </p>

                <button onClick={resetGame} className="text-[40px] font-bold border-2 border-black mt-4 bg-stone-200 px-3 rounded-md text-black">Jugar de nuevo :)</button>

            </div>


        </>

    )

}