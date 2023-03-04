// type imports
import type { NextPage } from 'next'

// named imports
import { useRef, useState } from 'react'
import { AuthLayout } from '../layouts'
import { LoginForm, RegisterForm } from '../components'
import { ConfirmationResult } from 'firebase/auth'

// default imports
import ValidateCodeForm from '../components/auth/ValidateCodeForm'

const Auth: NextPage = () => {
  const [currentForm, setCurrentForm] = useState<'login' | 'register' | 'validate'>('login')
  const [confirmationMessage, setConfirmationMessage] = useState<ConfirmationResult | null>(null)

  const codeRef = useRef<HTMLInputElement>(null) // login otp input ref

  return (
    <AuthLayout>
      {currentForm === 'login' ?
        <LoginForm
          setCurrentForm={setCurrentForm}
          setConfirmationMessage={setConfirmationMessage}
        />
        : currentForm === 'register' ?
          <RegisterForm
            setCurrentForm={setCurrentForm}
            setConfirmationMessage={setConfirmationMessage}
          />
        : <ValidateCodeForm
            setCurrentForm={setCurrentForm}
            codeRef={codeRef}
            confirmationMessage={confirmationMessage}
          />
      }
    </AuthLayout>
  )
}

export default Auth
