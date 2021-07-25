import { client } from '../api-client'
import { server, rest } from '../../test/server/test-server'
import { RestRequest } from 'msw'

const apiURL = process.env.REACT_APP_API_URL

test('make GET requests to the given endpoint', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    })
  )
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('add auth token when a token is provided', async () => {
  const token = 'FAKE_TOKEN'
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  let request: RestRequest | undefined
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    })
  )

  await client(endpoint, { token })

  expect(request?.headers.get('Authorization')).toEqual(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  let request: RestRequest | undefined
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    })
  )

  const customConfig = {
    method: 'PUT',
    headers: { 'Content-Type': 'fake-type' },
  }

  await client(endpoint, customConfig)

  expect(request?.headers.get('Content-Type')).toEqual(
    customConfig.headers['Content-Type']
  )
})

test('when data is provided, it is stringified and the method default to POST', async () => {
  const endpoint = 'test-endpoint'

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    })
  )

  const data = { a: 'b' }

  const result = await client(endpoint, { data })

  expect(result).toEqual(data)
})

test('correctly rejects a promise when there is an error', async () => {
  const endpoint = 'test-endpoint'
  const testError = { message: 'Test error' }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    })
  )

  await expect(client(endpoint)).rejects.toEqual(testError)
})
