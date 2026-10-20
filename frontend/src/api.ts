import type { NewUser, User } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function listUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/api/users`)
  if (!res.ok) {
    throw new Error("Couldn't load users. Check that the API is running.")
  }
  return res.json()
}

export async function createUser(payload: NewUser): Promise<User> {
  let res: Response
  try {
    res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error("Couldn't reach the API. Check that it's running.")
  }

  if (res.ok) {
    return res.json()
  }

  if (res.status === 409) {
    throw new Error("That email's already registered.")
  }
  if (res.status === 422) {
    throw new Error('Check the fields and try again.')
  }
  throw new Error('Something went wrong. Try again.')
}
