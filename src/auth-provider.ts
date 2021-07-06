const localStorageKey = '_localStorageKey_'

const authURL = process.env.REACT_APP_AUTH_URL

export async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

export interface UserCredential {
  username: string
  password: string
}

export interface AuthData {
  user: {
    token: string
  }
}

export function handleUserResponse({ user }: AuthData) {
  window.localStorage.setItem(localStorageKey, user.token)

  return user
}

export async function login({ username, password }: UserCredential) {
  return client('login', { username, password }).then(handleUserResponse)
}

export async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

export async function register({ username, password }: UserCredential) {
  return client('register', { username, password }).then(handleUserResponse)
}

async function client(endpoint: string, data: object) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}
