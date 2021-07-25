import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
}

initializeFirebase()

export function initializeFirebase() {
  app.initializeApp(config)
}

export function createUser(email: string, password: string) {
  return app.auth().createUserWithEmailAndPassword(email, password)
}

export function signInUser(email: string, password: string) {
  return app.auth().signInWithEmailAndPassword(email, password)
}

export function signOut() {
  return app.auth().signOut()
}
