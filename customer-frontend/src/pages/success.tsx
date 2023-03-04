// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { useEffect } from 'react'
import { LandingLayout } from '../layouts'
import { ListingSection } from '../components'
import { auth } from '../firebase'
import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/slices/userSlice'
import Link from 'next/link'

const Success: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = auth?.currentUser

    if (user) {
      dispatch(setUser({
        email: user.email!,
        name: user.displayName!,
        phone: user.phoneNumber!,
      }))
    }
  }, [])

  return (
    <LandingLayout>
      <div className='my-20 flex flex-col items-center justify-center'>
        <h2 className='text-4xl mb-4'>Order Confirmed!</h2>
        <h3 className='text-2xl mb-10'>Order ID: #8377</h3>

        <Link href='/orders' className='p-3 rounded-lg bg-emerald-600 text-white'>
          Go to Orders
        </Link>
      </div>
    </LandingLayout>
  )
}

export default Success
