import  { useEffect, useState } from "react"
import getText from './getData/getData'
import {getImage} from './getData/getImage'




function App() {
const [text,setText] = useState<string>('')
const [image,setImage] = useState<string>('')
const [loading,setloading] = useState(false)


useEffect(()=> {
  setloading(true)
  getText(text).then(e =>  setText(e)).finally(()=> setloading(true))
 
},[])


useEffect(()=> {
  setloading(true)
  getImage({text,setImage,setloading})
  
  
},[text])


  return (
    <>
    {loading? <h1>Cargando</h1>:<>
    
    <h1>Prueba Tecnica</h1>
      <h1 >{text}</h1>
      <img src={image} alt="Esta imagen deberia de mostrar a un gato" width={'100%'} height={300} />
      <div style={{textAlign:'center'}}>
      <button onClick={()=> getText(text).then(e =>  setText(e))}>Change Image</button>
      </div>
    
    </>}

      
    </>
  )
}

export default App
