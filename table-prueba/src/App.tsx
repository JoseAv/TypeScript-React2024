import { useEffect, useRef, useState } from 'react'
import './App.css'
import { User } from './Users'
import { type Result, type Filter, Filters, FiltersCountry, FilterCountry } from './types/users'

const api = 'https://randomuser.me/api/?results=100'

function App() {
  const [Users, setUser] = useState<Result[] | []>([])
  const [paint, setpaint] = useState(false)
  const [err, setErr] = useState('')
  const [sort, setSort] = useState<Filter>(Filters.SortNone)
  const [sortCountry, setSortCountry] = useState<FilterCountry>(FiltersCountry.SortNone)
  const [text, setText] = useState('')

  const refUser = useRef<Result[] | []>([])
  useEffect(() => {

    fetch(api)
      .then(res => res.json())
      .then(resolve => {
        refUser.current = resolve.results
        setUser(resolve.results)
      })
      .catch(err => setErr(err))
  }, [])

  function handleSort(fill: Filter | FilterCountry) {

    if (fill === FiltersCountry.SortCountry) {
      setSortCountry(prev => prev === FiltersCountry.SortCountry ? FiltersCountry.SortNone : FiltersCountry.SortCountry)
      setSort(Filters.SortNone)
    }

    if (fill === Filters.SortName) {
      setSort(prev => prev === Filters.SortName ? Filters.SortNone : Filters.SortName)
    }

    if (fill === Filters.SortLast) {
      setSort(prev => prev === Filters.SortLast ? Filters.SortNone : Filters.SortLast)
    }


  }

  const SorterText = text ?
    Users.filter(user => user.location.country.toLocaleLowerCase().includes(text.toLocaleLowerCase())) :
    Users


  const SorterdCountry = sortCountry === FiltersCountry.SortCountry ?
    [...SorterText].sort((a, b) => a.location.country.localeCompare(b.location.country)) :
    SorterText

  const SorterdUser = sort === Filters.SortName ?
    [...SorterdCountry].sort((a, b) => a.name.first.localeCompare(b.name.first)) :
    sort === Filters.SortLast ?
      [...SorterdCountry].sort((a, b) => a.name.last.localeCompare(b.name.last)) :
      SorterdCountry

  const DeleteUser = (id: string) => {
    const newUsers = Users.filter(user => user.login.uuid !== id)
    setUser(newUsers)
  }

  function Reset() {
    setUser(refUser.current)
  }


  return (
    <>
      {err && <p>Hubo Un error</p>}
      {Users.length < 1 && !err && <p>No hay Usuario</p>}
      <h1>Prueba Tecnica</h1>
      <div className='head'>

        <button onClick={() => setpaint(!paint)}>Colorear Filas</button>
        <button onClick={() => handleSort(FiltersCountry.SortCountry)}>{sortCountry === FiltersCountry.SortCountry ? 'No Ordenar Pais' : 'Ordenar Pais'}</button>
        <button onClick={Reset}>Resetear Estado</button>
        <input type="Paises" onChange={(evn) => setText(evn.target.value)} value={text} />
      </div>

      <User Users={SorterdUser} paint={paint} DeleteUser={DeleteUser} handleSort={handleSort} />
    </>
  )
}

export default App
