import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getNameAsync, selectUserName, setName } from '../features/user/userSlice'

const login = () => {
  const { data: session } = useSession()
  const [id, setId] = React.useState('')

  const dispatch = useAppDispatch()
  const name = useAppSelector(selectUserName)

  const handleSignon = id => {
    dispatch(getNameAsync(id))
    setId('')
  }

  if (session) {
    console.log(session);
    
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <input type={"text"} value={id} onChange={(e => setId(e.target.value))}></input>
      <button onClick={() => signIn(null, { callbackUrl: 'http://localhost:3000/' })}>Sign in</button>
    </>
  )
}

export default login