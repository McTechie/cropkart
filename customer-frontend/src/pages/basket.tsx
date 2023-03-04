// type imports
import type { NextPage } from 'next'

// named imports
import { useEffect } from 'react'
import { LandingLayout } from '../layouts'
import { CurrentBasket, Sidebar } from '../components'
import { auth } from '../firebase'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setUser } from '../redux/slices/userSlice'

// default imports
import Link from 'next/link'

interface BasketPageProps {
  data: Order[]
}

const Basket: NextPage<BasketPageProps> = ({ data }) => {
  // redux logic
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const basket = useAppSelector(state => state.basket.items)

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
      <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>
        <h2 className='text-3xl md:font-semibold border-b border-emerald-500 pb-1'>
          Your Basket
        </h2>

        {user && (
          <p className='mt-4 text-center md:text-left'>
            {basket?.length} item&#40;s&#41;
          </p>
        )}
      </div>

      {user ? (
        <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
          <CurrentBasket />
          <Sidebar />
        </div>
      ) : (
        <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>    
          <p className='mt-4 text-center md:text-left'>
            You need to be signed in to see your basket.
          </p>

          <Link href='/login'>
            <p className='text-emerald-600 underline mt-4 text-center'>Click here to sign in</p>
          </Link>
        </div>
      )}
    </LandingLayout>
  )
}

export default Basket
