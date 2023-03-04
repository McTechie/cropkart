// named imports
import { useRef } from 'react'
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/slices/userSlice'

interface RegisterFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<'login' | 'register' | 'validate'>>
  setConfirmationMessage: React.Dispatch<React.SetStateAction<ConfirmationResult | null>>
}

const RegisterForm = ({ setCurrentForm, setConfirmationMessage }: RegisterFormProps) => {
  // redux logic
  const dispatch = useAppDispatch()
  const latitude = useAppSelector(state => state.location.latitude)
  const longitude = useAppSelector(state => state.location.longitude)
  const city = useAppSelector(state => state.location.city)

  // form inputs
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // auth handlers
  const setUpRecaptcha = async (number: string) => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-verifier', {}, auth)
 
    recaptchaVerifier.render() // renders recaptcha widget

    // check if user exists in db
    const email: string | undefined = emailRef.current?.value

    const querySnapshot = await getDocs(collection(db, 'farmers'))
    const user = querySnapshot.docs.find(doc => doc.data().email === email)

    // if user exists, return user and confirmation
    const confirmation = await signInWithPhoneNumber(auth, number, recaptchaVerifier)
    
    return { user, confirmation }
  }

  const getCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const phone = phoneRef.current?.value.split(' ').join('')

    if (!name || !email || !phone) {
      alert('Please fill in all fields')
      return
    }

    try {
      const { user, confirmation } = await setUpRecaptcha(phone)

      if (!user) {
        // create user in db if user does not exist
        const userRef = doc(db, 'farmers', email)

        await setDoc(userRef, {
          name,
          email,
          phone,
          location: {
            latitude,
            longitude,
            city,
          },
        })

        dispatch(setUser({ name, email, phone }))
      }
      
      setConfirmationMessage(confirmation)
      setCurrentForm('validate')
    } catch (error) {
      alert('Enter a valid phone number')
    }
  }

  return (
    <form className='mx-6 md:w-full md:mx-auto bg-white border-2 border-emerald-700 rounded-xl px-4 py-10 md:px-20'>
      <h2 className='text-4xl text-center mt-2 mb-8 font-light'>
        Sign Up
      </h2>

      <input
        ref={nameRef}
        name='name'
        id='name' 
        type='tel'
        placeholder='Full Name'
        className='w-full border border-emerald-500 rounded-full py-3 px-6 md:text-lg mb-4 focus:outline-none'
      />

      <input
        ref={emailRef}
        name='email'
        id='email' 
        type='email'
        placeholder='Email'
        className='w-full border border-emerald-500 rounded-full py-3 px-6 md:text-lg mb-4 focus:outline-none'
      />

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
          onClick={() => setCurrentForm('login')}
          className='text-emerald-500'
        >
          Login Now
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
