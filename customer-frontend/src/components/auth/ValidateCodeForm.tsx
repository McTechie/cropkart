// named imports
import { useRouter } from 'next/router'
import { ConfirmationResult } from 'firebase/auth'

interface ValidateCodeFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<'login' | 'register' | 'validate'>>
  codeRef: React.RefObject<HTMLInputElement>
  confirmationMessage: ConfirmationResult | null
}

const ValidateCodeForm = ({ setCurrentForm, codeRef, confirmationMessage }: ValidateCodeFormProps) => {
  const router = useRouter()

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const code = codeRef.current?.value
    
    if (!code) return

    try {
      const res = await confirmationMessage?.confirm(code)

      console.log(res)

      router.push('/')
    } catch (error) {
      alert('Enter a valid OTP')
    }
  }

  return (
    <form className='mx-6 md:w-full md:mx-auto bg-white border-2 border-emerald-700 rounded-xl px-4 py-10 md:px-20'>
      <h2 className='text-4xl text-center mt-2 mb-10 font-light'>
        Validate OTP
      </h2>

      <input
        ref={codeRef}
        name='code'
        id='code'
        type='number'
        placeholder='Enter OTP'
        className='w-full border border-emerald-500 rounded-full py-3 px-6 md:text-lg mb-6 focus:outline-none'
      />

      <button
        onClick={handleLogin}
        className='w-full border border-emerald-500 bg-emerald-500 text-white rounded-full p-3 md:text-lg mb-10 flex space-x-2 items-center justify-center'
      >
        Confirm OTP
      </button>

      <hr />

      <div className='mt-2 text-sm text-center'>
        <button
          onClick={() => setCurrentForm('login')}
          className='text-emerald-500'
        >
          Go Back
        </button>
      </div>
    </form>
  )
}

export default ValidateCodeForm
