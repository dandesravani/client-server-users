import {
  Button,
  ButtonGroup,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { User } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'

interface UsersListProps {
  users: User[]
  onUpdate(user: User): void
  onDelete(id: User['id']): void
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  onUpdate,
  onDelete,
}) => {
  const router = useRouter()

  return (
    <>
      <Flex justify="flex-end" m="20px">
        <Button
          onClick={() => {
            router.push({ pathname: '/create' })
          }}
          colorScheme="blue"
        >
          Create
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>FullName</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.userName}</Td>
              <Td>{user.email}</Td>

              <Td>
                <ButtonGroup variant="solid" spacing="6" m="15px">
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      onUpdate(user)
                      router.push({ pathname: `/users/${user.id}` })
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      onDelete(user.id)
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
