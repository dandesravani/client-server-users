import { prisma } from '@lib/db'
import type { User } from '@prisma/client'

export const all = async () => {
  return prisma.user.findMany()
}

export const one = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (user == null) {
    throw new Error(`User with ${id} not found`)
  }

  return user
}

export const create = async (user: Omit<User, 'id'>) => {
  return prisma.user.create({ data: user })
}

export const del = async (id: number) => {
  return prisma.user.delete({ where: { id } })
}

export const update = async (id: number, user: User) => {
  return prisma.user.update({
    where: { id },
    data: user,
  })
}
