import {type typeArrayMovie} from '../conts/const'
import { useCallback, useMemo, useState } from 'react'




export function useGetImage(filyear:boolean){
    
    const [movies,setMovies] = useState<typeArrayMovie>([]) // Inicializar como seria si no recibe el texto
    

  
      const callApi= useCallback( async (text:string):Promise<void> =>{ //tipar Promesas
    

        if (text.trim() !== '') {
            const callmovie = 'http://www.omdbapi.com/?apikey=4287ad07&s=' + text
            const res =  await fetch(callmovie)
            const data = await res.json()
            setMovies( data.Search)
        }else{
            setMovies([])
        }
    
        
    
    },[])


    const newmovies = useMemo(() => { //Impide que se haga el calculo multiples veces
        return filyear 
        ?[...movies].sort((a,b) => a.Title.localeCompare(b.Title))
         : movies
 
       }, [movies,filyear]);
       
       return { movies: newmovies, callApi};



}


 