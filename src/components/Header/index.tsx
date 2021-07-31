import React from 'react'
import { useAuth } from '../../context/auth-context'
import { Header as StyledHeader, Logo } from './style'
import { Button, Input } from '../lib'

function Header() {
  const { logout } = useAuth()

  return (
    <StyledHeader>
      <Logo>Foodie</Logo>
      <Input type="search" placeholder="Search" />
      <Button onClick={logout}>Log out</Button>
    </StyledHeader>
  )
}

export default Header
