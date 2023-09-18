import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/patients')

  response.assertStatus(200)
  // response.assertBodyContains({ hello: 'world' })
})
