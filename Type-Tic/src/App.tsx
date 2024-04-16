import {Main} from './renders/RenderMain'
import {WinnerPossible} from './const/Const'
import {useGame} from './hooks/useGame'
function App():JSX.Element {
  
const {handlenGame,board,turn,winner,ResetGame} = useGame()
  
  

  return (
    <>

<Main turn={turn}
winner={winner} 
WinnerPossible={WinnerPossible} 
board={board} 
handlenGame={handlenGame} 
ResetGame={ResetGame}
>
</Main>
    
    </>
  )
}

export default App
