import type { NextApiResponse } from 'next'

export const handleError = (error: any, res: NextApiResponse) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message })
  } else if (typeof error === 'string') {
    res.status(400).json({ error })
  }
  res.status(400).json({ error: 'Unknown error' })
}
