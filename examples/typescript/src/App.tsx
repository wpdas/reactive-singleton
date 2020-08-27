import React, { useEffect } from 'react'
import { useSingletonStatus, useWasDataUpdated } from 'reactive-singleton'
import UserService from './singletons/UserService'

const App = () => {
  // Gets Singleton's instance
  const userService = UserService.getInstance()
  const userServiceStatus = useSingletonStatus(UserService)
  const wasDataUpdated = useWasDataUpdated(UserService)

  const {
    user: { name, email, token, isAllowed },
  } = userService

  useEffect(() => {
    // (!) Methods can't be destructured
    userService.login('user@email.com', '123456pass')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRequestNewToken = () => {
    userService.login('user@email.com', '123456pass')
  }

  return (
    <div>
      <span>USER DATA</span>
      <p>status: {userServiceStatus}</p>
      <p>is using default values: {!wasDataUpdated ? 'Yes' : 'No'}</p>
      {userServiceStatus === 'ready' ? (
        <>
          <span>Name: {name}</span>
          <span>Email: {email}</span>
          <span>AccessToken: {token}</span>
          <span>Has access: {isAllowed.toString()}</span>
          <br />
          <button type="button" onClick={handleRequestNewToken}>
            Request New Token
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
