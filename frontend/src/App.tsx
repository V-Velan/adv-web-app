import { useEffect, useState } from 'react'
import { listUsers } from './api'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import type { User } from './types'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    listUsers()
      .then(setUsers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleCreated = (user: User) => {
    setUsers((prev) => [user, ...prev])
    setError(null)
  }

  return (
    <main className="app">
      <header>
        <h1>User registration</h1>
      </header>
      <UserForm onCreated={handleCreated} />
      <UserList users={users} loading={loading} error={error} />
    </main>
  )
}

export default App
