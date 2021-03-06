import React from 'react'
import { Modal, ModalOpenButton, ModalContents } from '../Modal'
import LoginForm from '../LoginForm'
import { Button } from '../lib'
import {
  UnAuthenticatedAppContainer,
  AuthenticationSection,
  Heading,
} from './style'
import { useAuth } from '../../context/auth-context'

function UnAuthenticatedApp() {
  const { login, register } = useAuth()

  return (
    <UnAuthenticatedAppContainer>
      <Heading>Foodie</Heading>
      <AuthenticationSection>
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm onSubmit={login} submitButton={<Button>Login</Button>} />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button>Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button>Register</Button>}
            />
          </ModalContents>
        </Modal>
      </AuthenticationSection>
    </UnAuthenticatedAppContainer>
  )
}

export default UnAuthenticatedApp
