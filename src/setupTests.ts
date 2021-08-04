import '@testing-library/jest-dom'
import { server } from './test/server/test-server'

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  })
)
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
