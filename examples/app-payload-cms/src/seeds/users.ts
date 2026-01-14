import { BasePayload } from 'payload'

export default async function (payload: BasePayload) {
  const { PAYLOAD_EMAIL, PAYLOAD_PASSWORD } = process.env

  if (!PAYLOAD_EMAIL || !PAYLOAD_PASSWORD) {
    throw new Error(
      'Environment variables PAYLOAD_EMAIL and PAYLOAD_PASSWORD must be set to seed users.',
    )
  }

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.docs.length > 0) {
    payload.logger.info('Users already exist, skipping seeding.')
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email: PAYLOAD_EMAIL,
      password: PAYLOAD_PASSWORD,
    },
  })

  payload.logger.info('Users successfully seeded!')
}
