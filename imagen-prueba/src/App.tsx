import './App.css'
import pelicula from './mocks/Peliculas.json'
function App() {
 console.log(pelicula)
const peliculas = pelicula.Search
  return (
    <div className='page'>

    <header>
      <h1>Hola</h1>
    </header>

     <main >
      <div className='movies'>
      {peliculas.map(movie => (
        <div className='movie' key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Type}</p>
          <img src={movie.Poster} alt="" />
        </div>
     
      ))}
       </div>
     </main>
        
     </div>
  )
}

export default App
