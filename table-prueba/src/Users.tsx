import { type Result } from './types/users'
interface typeUsers {
    Users: Result[] | []
}

export function User({ Users }: typeUsers) {


    return (
        <>
            {JSON.stringify(Users)}
        </>


    )


}