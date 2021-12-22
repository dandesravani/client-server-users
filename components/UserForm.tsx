import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import type { User } from '@prisma/client'
import React from 'react'

interface UserFormProps {
  user?: User
  onUserSubmit(user: Omit<User, 'id'>): void
}

const initial = {
  name: '',
  userName: '',
  email: '',
}

export const UserForm = ({ user, onUserSubmit }: UserFormProps) => {
  const [newUser, setUser] = React.useState<Omit<User, 'id'>>(user || initial)

  return (
    <Box
      w="600px"
      m="0 auto"
      p="20px"
      mt="20px"
      backgroundColor="#eee"
      boxShadow="0 8px 8px -4px lightblue"
    >
      <form>
        <FormControl isRequired>
          <FormLabel htmlFor="full-name">Full name</FormLabel>
          <Input
            placeholder="Full name"
            value={newUser.name}
            onChange={e => setUser({ ...newUser, name: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            placeholder="User name"
            value={newUser.userName}
            onChange={e => setUser({ ...newUser, userName: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">First name</FormLabel>
          <Input
            placeholder="email"
            value={newUser.email}
            onChange={e => setUser({ ...newUser, email: e.target.value })}
          />
        </FormControl>
        <ButtonGroup variant="solid" spacing="6" m="15px">
          <Button
            colorScheme="blue"
            onClick={e => {
              e.preventDefault()
              onUserSubmit(newUser)
            }}
          >
            Save
          </Button>
          <Button onClick={() => setUser(initial)}>Reset</Button>
        </ButtonGroup>
      </form>
    </Box>
  )
}
