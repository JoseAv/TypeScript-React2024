import { type Result, FilterCountry, Filter, Filters, FiltersCountry } from './types/users'
interface typeUsers {
    Users: Result[]
    paint: boolean
    DeleteUser: (id: string) => void
    handleSort: (fill: FilterCountry | Filter) => void
}

export function User({ Users, paint, DeleteUser, handleSort }: typeUsers) {
    const paintRow = paint ? 'table' : ''

    return (
        <>
            <table width="100%">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th className='pointe' onClick={() => handleSort(Filters.SortName)}>Nombre</th>
                        <th className='pointe' onClick={() => handleSort(Filters.SortLast)}>Apellido</th>
                        <th className='pointe' onClick={() => handleSort(FiltersCountry.SortCountry)}>Pais</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className={paintRow}>
                    {Users.length > 0 ? Users.map(user => (
                        <tr key={user.login.uuid}>
                            <td><img src={user.picture.thumbnail} alt="Esta es una imagen creada por IA desde la Api random" /></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td><button onClick={() => {
                                const id = user.login.uuid
                                DeleteUser(id)
                            }}>Borrar</button></td>
                        </tr>
                    )) : <tr><td>Adios</td></tr>}
                </tbody>

            </table>
        </>


    )


}