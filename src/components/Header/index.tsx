import React from 'react'
import { useAuth } from '../../context/auth-context'
import { Header as StyledHeader, Logo } from './style'
import { Button, Input } from '../lib'
import debounceFn from 'debounce-fn';
import { useHistory } from 'react-router-dom'

function Header() {
  const { logout } = useAuth()

    const history = useHistory()

    const handleSearch = debounceFn((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        const redirectRoute = `/search?q=${value}`

        history.push(redirectRoute)
    }, {wait: 300})

  return (
    <StyledHeader>
      <Logo href="/">Foodie</Logo>
      <Input type="search" onChange={handleSearch} placeholder="Search" />
      <Button onClick={logout}>Log out</Button>
    </StyledHeader>
  )
}

export default Header
