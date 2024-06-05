import { useEffect, useState } from 'react'
import './App.css'
import { User } from './Users'
import {type  Result } from './types/users'

const api = 'https://randomuser.me/api/?results=100'

function App() {
  const [Users, setUser] = useState<Result[] | []>([])


  useEffect(() => {

    fetch(api)
      .then(res => res.json())
      .then(resolve => setUser(resolve))
      .catch(err => console.log(err))
  }, [])




  return (
    <>
      <User Users={Users} />
    </>
  )
}

export default App
