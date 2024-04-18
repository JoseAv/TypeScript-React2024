import {type typeMovie,typeArrayMovie} from '../conts/const'

interface typemovies { // Crear interface para tipar el dato que llegara a la funcion
  movies:typeArrayMovie

}


export function Movies ({movies}:typemovies) {

return(
<>
{movies.map((movie:typeMovie) => (
  <div className='movie' key={movie.imdbID}>
    <h3>{movie.Title}</h3>
    <p>{movie.Year}</p>
    <img src={movie.Poster} alt="" />
  </div>

))}


</>

)



}