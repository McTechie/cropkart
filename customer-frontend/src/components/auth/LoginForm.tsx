// named imports
import { useRef } from 'react'
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase'

interface LoginFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<'login' | 'register' | 'validate'>>
  setConfirmationMessage: React.Dispatch<React.SetStateAction<ConfirmationResult | null>>
}

const LoginForm = ({ setCurrentForm, setConfirmationMessage }: LoginFormProps) => {
  const phoneRef = useRef<HTMLInputElement>(null)

  const setUpRecaptcha = async (number: string) => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-verifier', {}, auth)
 
    recaptchaVerifier.render()

    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  const getCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const phone = phoneRef.current?.value

    if (!phone) return

    try {
      const response = await setUpRecaptcha(phone)

      console.log(response)
      
      setConfirmationMessage(response)
      setCurrentForm('validate')
    } catch (error) {
      alert('Enter a valid phone number')
    }
  }

  return (
    <form className='mx-6 md:w-full md:mx-auto bg-white border-2 border-emerald-700 rounded-xl px-4 py-10 md:px-20'>
      <h2 className='text-4xl text-center mt-2 mb-10 font-light'>
        Login
      </h2>

      <input
        ref={phoneRef}
        name='phone'
        id='phone'
        type='tel'
        placeholder='Phone'
        className='w-full border border-emerald-500 rounded-full py-3 px-6 md:text-lg mb-6 focus:outline-none'
      />

      <button
        onClick={getCode}
        className='w-full border border-emerald-500 bg-emerald-500 text-white rounded-full p-3 md:text-lg mb-10 flex space-x-2 items-center justify-center'
      >
        Send One Time Password
      </button>

      <div className='flex items-center justify-center mb-6 -mt-3'>
        <div id='recaptcha-verifier' />
      </div>

      <div>
        <div className='w-full border' />
        <div className='flex justify-center'>
          <p className='bg-white px-2 relative -top-4 inline'>or</p>
        </div>
      </div>

      <button
        className='w-full border border-emerald-500 bg-emerald-500 text-white rounded-full p-3 md:text-lg mb-10 flex space-x-2 items-center justify-center mt-4'
      >
        <div className='bg-white rounded-full p-1'>
          <svg xmlns='https://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 48 48' aria-hidden='true'>
            <path fill='#4285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'></path><path fill='#34A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'></path><path fill='#FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'></path><path fill='#EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'></path><path fill='none' d='M2 2h44v44H2z'></path>
          </svg>
        </div>
        <span className='pt-1'>Continue with Google</span>
      </button>

      <hr />

      <div className='mt-2 text-sm flex space-x-1'>
        <p>New to CropKart?</p>
        <button
          onClick={() => setCurrentForm('register')}
          className='text-emerald-500'
        >
          Create Account
        </button>
      </div>
    </form>
  )
}

export default LoginForm
