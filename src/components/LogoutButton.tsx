import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Sign out</button>
  )
}

export default LogoutButton