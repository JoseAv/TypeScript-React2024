import {InitialTurn,WinnerPossible,typeTurn,typesWinner,ArrayGame,typesBoard} from '../const/Const.ts'
import Confetti from 'react-confetti'

interface MainProps {
  winner:typesWinner,
  WinnerPossible:  typeof WinnerPossible,
  board:ArrayGame,
  handlenGame: (index:number)=> void
  turn:typeTurn
  ResetGame: () => void

}



export const Main:React.FC<MainProps> =({board,winner,WinnerPossible,handlenGame,turn,ResetGame})=>{



    return <>
    
<main className='board'>
     
{winner=== null ? <h1>Tic Tac Toe</h1> : winner === WinnerPossible.Draw?<h1 style={{color:'rgb(148, 206, 244)'}}>Draw</h1> 
: 
<>
<h1 >Winner is: <strong style={{color:'rgb(148, 206, 244)', height:'80px'} }>{winner}</strong> </h1>
<Confetti
width={2000}
height={2000}
/>
</>
}


<div className='game' >
{ board.map((e:typesBoard,index:number)=> (

  <button onClick={()=>(handlenGame(index))} key={index} className='square'>{e === null? null : e === InitialTurn.O? '⭕' : '✖️' }</button>
))}

</div>


  {winner !== null? <button onClick={ResetGame}>Reset Game</button> : 
  <section className='turn'>
  <p className={turn === 'X'? 'square is-selected': 'square'}>X</p>
  <p className={turn === 'O'? 'square is-selected': 'square'}>O</p>
  </section>
  }
  

</main>
    
    
    
    </>


}