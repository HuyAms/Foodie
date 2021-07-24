import { createUser, signInUser, signOut } from './utils/firebase'
import app from 'firebase/app'

const localStorageKey = '_localStorageKey_'

const authURL = process.env.REACT_APP_AUTH_URL

export async function getUserCredential() {
  const data = window.localStorage.getItem(localStorageKey)
  return data ? JSON.parse(data) : null
}

export type UserCredential = app.auth.UserCredential

export function handleUserResponse(data: UserCredential) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(data))

  return data
}

export async function login(email: string, password: string) {
  return signInUser(email, password).then(handleUserResponse)
}

export async function logout() {
  return signOut().then(() => window.localStorage.removeItem(localStorageKey))
}

export async function register(email: string, password: string) {
  return createUser(email, password).then(handleUserResponse)
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
