import './App.css'
import {useGetImage} from './hooks/getMovies'
import debounce from "just-debounce-it";

import {Movies} from './Components/Movies'
import  { useState,FormEvent,useRef, ChangeEvent, useCallback } from 'react'


function App() {

const [Text, setText] = useState<string >('')
const [filyear,setFilyeard] = useState<boolean>(false)
const inputRef = useRef<HTMLInputElement | null>(null) // Inicializar el useRef con el elemento o null

const {movies,callApi} = useGetImage(filyear)


const getDebounceMovies=useCallback( 
  debounce((Text:string)=> {callApi(Text)},500)

,[])




const handlenTextController=(e:FormEvent<HTMLFormElement >): void =>  {
  e.preventDefault()
  const input = inputRef.current?.value // puede no tener nada

  if(input === undefined) return // Siempre procurpar que no llega el estado no deseado
  setText(input)
}

const handlentText = (e: ChangeEvent<HTMLInputElement>): void => {
  const newText = e.target.value
  setText(newText)
  getDebounceMovies(newText)
  
}

const handlentchecked = (e: ChangeEvent<HTMLInputElement>): void => {
  const value = e.target.checked
  setFilyeard(value)
  
}


return (
  <div className='page' >
<h1>Buscar Peliculas</h1>


  <header>
    <form onSubmit={(e)=> handlenTextController(e)}>
      <input ref={inputRef} name='input' type="text" onChange={(e)=> handlentText(e) } value={Text} />
      <input type="checkbox" onChange={(e)=> handlentchecked(e)}/>
      <button>Buscar</button>
    </form>
  </header>



   <main >
    <div className='movies'>
    {movies=== undefined ? <h2>Sin Movies</h2>:<Movies movies={movies}/>} 
     </div>
   </main>
      
   </div>
)
}




export default App
