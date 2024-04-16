import  { useState } from 'react'
import {typesBoard,InitialTurn,WinnerCombination,WinnerPossible,typeTurn,typesWinner,ArrayGame,ArrayBoard} from '../const/Const'

export const useGame = ()=> {

    const [board, setBoard] = useState<ArrayGame>(ArrayBoard)
    const [turn,setTurn] = useState<typeTurn>(InitialTurn.X)
    const [winner,setWinnter] = useState<typesWinner>(null)
  
   const handlenGame =(position:number)=> {
    console.log(winner)
    if(winner !==null) return
  
    const newBoard:ArrayGame = [...board]
    
  
      newBoard[position] = turn
      setBoard(newBoard)
      turn === InitialTurn.X? setTurn(InitialTurn.O) : setTurn(InitialTurn.X)
      ResultGame(newBoard)
   }
  
  function ResultGame(newBoard:ArrayGame) {
    WinnerCombination.forEach((arrays) => {
    if(newBoard[arrays[0]] === WinnerPossible.X 
      &&  newBoard[arrays[1]] === WinnerPossible.X  
      && newBoard[arrays[2]] === WinnerPossible.X){
        setWinnter(WinnerPossible.X)
       
        
  }
  
  if(newBoard[arrays[0]] === WinnerPossible.O 
    &&  newBoard[arrays[1]] === WinnerPossible.O  
    && newBoard[arrays[2]] === WinnerPossible.O){
      setWinnter(WinnerPossible.O)
      
  }
  
  const FinishGame = newBoard.find((e:typesBoard) => e === null)
  if(FinishGame !== null) return setWinnter(WinnerPossible.Draw)
  
  
    })
  
  
  }


   function ResetGame(){
    setBoard(ArrayBoard)
    setTurn(InitialTurn.X)
    setWinnter(null)

  }


return {handlenGame,board,turn,winner,ResetGame}


}