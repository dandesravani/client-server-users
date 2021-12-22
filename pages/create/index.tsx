import { UserForm } from '@components/UserForm'
import type { User } from '@prisma/client'
import React from 'react'

export default function Create() {
  const [user, setUser] = React.useState<Omit<User, 'id'>>()

  const handleSubmit = (user: Omit<User, 'id'>) => {
    fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(setUser)
      .catch(err => console.error(err))
  }

  return user ? (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  ) : (
    <UserForm onUserSubmit={handleSubmit} />
  )
}
