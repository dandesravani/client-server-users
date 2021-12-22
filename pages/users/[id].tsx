import { Heading } from '@chakra-ui/react'
import { UserForm } from '@components/UserForm'
import type { User } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'

export default () => {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>()

  const { id } = router.query

  // React.useEffect(() => {
  //   if (id === undefined) {
  //     return
  //   }

  //   fetch(`/api/users/${id}`)
  //     .then(res => res.json())
  //     .then(setUser)
  // }, [id])

  const handleSubmit = (user: User) => {
    fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(user => {
        console.log('put response: ', user)
        router.push('/users')
      })
      .catch(err => {
        console.error(err)
      })
  }

  return user ? (
    <UserForm user={user} onUserSubmit={handleSubmit} />
  ) : (
    <Heading>Loading</Heading>
  )
}
