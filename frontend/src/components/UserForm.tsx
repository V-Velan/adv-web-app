import { useState } from 'react'
import type { FormEvent } from 'react'
import { createUser } from '../api'
import type { NewUser, User } from '../types'

interface Props {
  onCreated: (user: User) => void
}

const emptyForm: NewUser = {
  name: '',
  email: '',
  phone: '',
  date_of_birth: '',
}

type Status = { kind: 'success' | 'error'; text: string } | null

function UserForm({ onCreated }: Props) {
  const [form, setForm] = useState<NewUser>(emptyForm)
  const [status, setStatus] = useState<Status>(null)
  const [saving, setSaving] = useState(false)

  const update = (field: keyof NewUser) => (e: { target: { value: string } }) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setStatus(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const user = await createUser({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      })
      onCreated(user)
      setForm(emptyForm)
      setStatus({ kind: 'success', text: 'User saved' })
    } catch (err) {
      setStatus({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add a user</h2>
      <div className="grid">
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Maya Rodriguez"
            maxLength={100}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="name@company.com"
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+91 98765 43210"
            minLength={5}
            maxLength={20}
            required
          />
        </label>
        <label>
          Date of birth
          <input
            type="date"
            value={form.date_of_birth}
            onChange={update('date_of_birth')}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </label>
      </div>
      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save user'}
        </button>
        {status && (
          <span className={`status ${status.kind}`} role="status">
            {status.text}
          </span>
        )}
      </div>
    </form>
  )
}

export default UserForm
