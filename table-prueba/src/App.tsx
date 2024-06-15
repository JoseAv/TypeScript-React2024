import { useEffect, useRef, useState } from 'react'
import './App.css'
import { User } from './Users'
import { type Result, type Filter, Filters, FiltersCountry, FilterCountry } from './types/users'

interface typeFetch {
  CallUser: (page: number) => Promise<Result[] | void>
}

async function CallUser(page: number): ReturnType<typeFetch['CallUser']> {
  try {
    console.log(page)
    const res = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`)

    if (!res.ok) return
    const resolve = await res.json()
    const newUser: Result[] = resolve.results
    return newUser


  } catch (er) {
    console.log(er)
  }
}


function App() {
  const [Users, setUser] = useState<Result[] | []>([])
  const [paint, setpaint] = useState(false)
  const [err, setErr] = useState('')
  const [sort, setSort] = useState<Filter>(Filters.SortNone)
  const [sortCountry, setSortCountry] = useState<FilterCountry>(FiltersCountry.SortNone)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setpage] = useState<number>(1)




  const refUser = useRef<Result[] | []>([])
  useEffect(() => {
    setLoading(true)

    CallUser(page).then(resolve => {
      if (!resolve) return
      if (resolve.length <= 0) return

      if (Users.length <= 0) {
        refUser.current = resolve
        setUser(resolve)
        return
      }

      setUser(prevUsers => {
        if (prevUsers.length <= 0) return resolve
        const Newuser = [...prevUsers, ...resolve]
        refUser.current = Newuser
        return Newuser
      })
    })
      .catch(err => setErr(err))
      .finally(() =>
        setLoading(false)
      )
  }, [page, User])

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
      <h1>Prueba Tecnica</h1>
      <div className='head'>

        <button onClick={() => setpaint(!paint)}>Colorear Filas</button>
        <button onClick={() => handleSort(FiltersCountry.SortCountry)}>{sortCountry === FiltersCountry.SortCountry ? 'No Ordenar Pais' : 'Ordenar Pais'}</button>
        <button onClick={Reset}>Resetear Estado</button>
        <input type="Paises" onChange={(evn) => setText(evn.target.value)} value={text} />

      </div>


      <User Users={SorterdUser} paint={paint} DeleteUser={DeleteUser} handleSort={handleSort} />

      {loading && <h1>Cargando</h1>}
      {page === 3 ? <p>No hay mas resultados</p> : <button onClick={() => {
        setpage(page + 1)
      }}>Agregar Mas</button>}
      {err && !loading && <h1>Hubo Un error</h1>}
      {Users.length < 1 && !err && !loading && <h1>No hay Usuario</h1>}

    </>
  )
}

export default App
