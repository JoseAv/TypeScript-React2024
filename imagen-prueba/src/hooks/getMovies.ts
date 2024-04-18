import {type typeArrayMovie} from '../conts/const'
import { useCallback, useEffect, useMemo, useState } from 'react'




export function useGetImage(text:string,filyear:boolean){
    
    const [movies,setMovies] = useState<typeArrayMovie>([]) // Inicializar como seria si no recibe el texto
    

    useEffect(()=> {
        if (text.trim() !== '' && text.length > 3)  { // Verificar que el texto no esté vacío
            callApi(text).then(data => setMovies(data));
        } else {
            setMovies([]); // Establecer películas como vacío si el texto está vacío
        }
    },[text])



  
      const callApi= useCallback( async (text:string):Promise<typeArrayMovie> =>{
    

        if (text.trim() !== '') {
            const callmovie = 'http://www.omdbapi.com/?apikey=4287ad07&s=' + text
            const res =  await fetch(callmovie)
            const data = await res.json()
            return data.Search
        }else{
            return []
        }
    
        
    
    },[])


    const newmovies = useMemo(() => {
        return filyear 
        ?[...movies].sort((a,b) => a.Title.localeCompare(b.Title))
         : movies
 
       }, [movies,filyear]);
       
       return { movies: newmovies };



}


 