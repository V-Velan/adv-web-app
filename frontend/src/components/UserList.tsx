import type { User } from '../types'

interface Props {
  users: User[]
  loading: boolean
  error: string | null
}

function UserList({ users, loading, error }: Props) {
  return (
    <section className="card">
      <h2>Saved users</h2>
      {error && <p className="status error">{error}</p>}
      {!error && loading && <p className="muted">Loading…</p>}
      {!error && !loading && users.length === 0 && (
        <p className="muted">No users yet. Add your first one above.</p>
      )}
      {users.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.date_of_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default UserList
