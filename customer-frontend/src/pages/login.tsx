// type imports
import type { NextPage } from 'next'

// named imports
import { useState } from 'react'
import { AuthLayout } from '../layouts'
import { LoginForm, RegisterForm } from '../components'

const Auth: NextPage = () => {
  const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login')

  return (
    <AuthLayout>
      {currentForm === 'login' ?
        <LoginForm setCurrentForm={setCurrentForm} /> :
        <RegisterForm setCurrentForm={setCurrentForm} />
      }
    </AuthLayout>
  )
}

export default Auth
