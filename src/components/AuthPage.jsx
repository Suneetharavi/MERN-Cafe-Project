import React from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

function AuthPage({user,setUser}) {
  return (
    <>
    <div>AuthPage</div>
    <SignUpForm/>

    <LoginForm setUser={setUser}/>
    </>
  )
}

export default AuthPage