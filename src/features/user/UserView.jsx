import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './userSlice'

export const UserView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const { users, loading, error } = useSelector((state) => state.user)

  let content = 'Loading...'
  if (!loading) {
    content = (
      <div>
        <h2>List of Users</h2>
        {users.map((user) => (
          <div key={Math.random()}>{user}</div>
        ))}
      </div>
    )
  }
  if (!loading && users.length === 0) {
    content = <div>{error}</div>
  }

  return <div>{content}</div>
}
