import { all, create } from '@db/users'
import { handleError } from '@lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        try {
          const users = await all()
          res.json(users)
        } catch (error) {
          handleError(error, res)
        }
        break

      case 'POST':
        res.json(await create(req.body))
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
