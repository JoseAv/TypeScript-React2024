import { useState } from 'react'
import './App.css'
import { User } from './Users'
import { type Result, type Filter, Filters, FiltersCountry, FilterCountry } from './types/users'
import { useInfiniteQuery } from '@tanstack/react-query'



async function CallUser({ pageParam = 1 }: { pageParam?: number }): Promise<{ Users: Result[], nextCursor?: number }> {
  try {

    const res = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=10&seed=abc`)

    const resolve = await res.json()
    const Users: Result[] = resolve.results ?? []
    const CurrentPage = pageParam + 1
    const nextCursor = CurrentPage > 3 ? undefined : CurrentPage

    return {
      Users,
      nextCursor
    }


  } catch (er) {
    return { Users: [], nextCursor: -1 }
  }
}


function App() {
  const [paint, setpaint] = useState(false)
  const [sort, setSort] = useState<Filter>(Filters.SortNone)
  const [sortCountry, setSortCountry] = useState<FilterCountry>(FiltersCountry.SortNone)
  const [text, setText] = useState('')

  const { isLoading, isError, data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({ // no tipar el useInfiniteQuery
    queryKey: ['users'],
    queryFn: CallUser,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  })


  const Users = data?.pages.flatMap(page => page.Users) ?? [] // Revisar page que es donde estara el arreglo de Users


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
    Users ?? []


  const SorterdCountry = sortCountry === FiltersCountry.SortCountry && SorterText?.length ?
    [...SorterText].sort((a, b) => a.location.country.localeCompare(b.location.country)) :
    SorterText

  const SorterdUser = sort === Filters.SortName && SorterdCountry?.length ?
    [...SorterdCountry].sort((a, b) => a.name.first.localeCompare(b.name.first)) :
    sort === Filters.SortLast && SorterdCountry?.length ?
      [...SorterdCountry].sort((a, b) => a.name.last.localeCompare(b.name.last)) :
      SorterdCountry

  const DeleteUser = (id: string) => {
    Users.filter(user => user.login.uuid !== id)
    console.log(Users)

  }

  function Reset() {
    refetch
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


      <User Users={SorterdUser ?? []} paint={paint} DeleteUser={DeleteUser} handleSort={handleSort} />

      {isLoading && <h1>Cargando</h1>}
      {!hasNextPage ? <p>No hay mas resultados</p> : <button onClick={() => {
        fetchNextPage()
      }}>Agregar Mas</button>}
      {isError && !isLoading && <h1>Hubo Un error</h1>}
      {Users.length < 1 && !isError && !isLoading && <h1>No hay Usuario</h1>}

    </>
  )
}

export default App
