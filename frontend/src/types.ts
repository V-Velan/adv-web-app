export interface User {
  id: number
  name: string
  email: string
  phone: string
  date_of_birth: string
  created_at: string
}

export interface NewUser {
  name: string
  email: string
  phone: string
  date_of_birth: string
}
