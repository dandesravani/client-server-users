import { del, one, update } from '@db/users'
import { handleError } from '@lib/utils'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const { query, method } = req
  try {
    const id = z.number().parse(Number(query.id))

    switch (method) {
      case 'GET':
        res.json(await one(id))
        break

      case 'PUT':
        res.json(await update(id, req.body))
        break

      case 'DELETE':
        res.json(await del(id))
        break

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'D'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
