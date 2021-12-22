import { UsersList } from '@components/UsersList'
import type { User } from '@prisma/client'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Users() {
  const { data, error, mutate } = useSWR('/api/users', fetcher)
  const [updated, setUpdated] = React.useState<User | null>()

  if (error) {
    return <h1>Error</h1>
  }

  if (!data) {
    return <h1>Loading...</h1>
  }

  const handleUpdate = (user: User) => {
    fetch(`api/users/2`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(user => setUpdated(user as any))
      .catch(err => console.error(err))
  }

  const handleDelete = (id: number) => {
    fetch(`api/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(user => {
        console.log(user)
        mutate()
      })
      .catch(err => console.log(err))
  }

  console.log(updated)

  return (
    <>
      <UsersList users={data} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
  )
}

// const handleCreate = () => {
//   fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(
//       { name: 'foo', userName: 'foo bar', email: 'foo@bar.com' } as User,
//       null,
//       2,
//     ),
//   })
//     .then(res => {
//       if (res.ok) {
//         res.json().then(user => setNewUser(user))
//       } else {
//         throw new Error('foo bar')
//       }
//     })
//     .catch(err => console.error(err))
// }
