
import type { NextApiRequest, NextApiResponse } from 'next'

const users = {
    "1": "tim",
    "2": "omi",
    "3": "junie",
}

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const {
        query: { id },
        method,
      } = request;

    const name = users[`${id}`]

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  response.json({ data: name })
}

export default userHandler