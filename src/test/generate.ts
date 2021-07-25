import faker from 'faker'

export function buildLoginForm(overrides?: {
  email: string
  password: string
}) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  }
}
