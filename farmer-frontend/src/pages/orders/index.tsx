// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { useEffect } from 'react'
import { LandingLayout } from '../../layouts'
import { PreviousOrders } from '../../components'
import { auth } from '../../firebase'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/slices/userSlice'

// default imports
import Link from 'next/link'

interface OrdersPageProps {
  data: Order[]
}

const Orders: NextPage<OrdersPageProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)

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

  useEffect(() => {
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // const ordersRef = collection(db, 'customers', email, 'orders')
    // const ordersQuery = query(ordersRef, orderBy('timestamp', 'desc'))
    // const ordersInFirebase = await getDocs(ordersQuery)
    
    // const orders = await Promise.all(
    //   ordersInFirebase.docs.map(async (order) => ({
    //     id: order.id,
    //     amount: order.data().amount,
    //     shipping: order.data().amount_shipping,
    //     images: order.data().images,
    //     timestamp: moment(order.data().timestamp.toDate()).unix(),
    //     items: (
    //       await stripe.checkout.sessions.listLineItems(order.id, {
    //         limit: 100
    //       })
    //     ).data,
    //   }))
    // )
  }, [])

  return (
    <LandingLayout>
      {user ? <PreviousOrders data={data} /> : (
        <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>
          <h2 className='text-3xl md:font-semibold border-b border-emerald-500 pb-1'>
            Your Orders
          </h2>
    
          <p className='mt-4 text-center md:text-left'>
            You need to be signed in to see your orders.
          </p>

          <Link href='/login'>
            <p className='text-emerald-600 underline mt-4 text-center'>Click here to sign in</p>
          </Link>
        </div>
      )}
    </LandingLayout>
  )
}

export default Orders

export const getServerSideProps: GetServerSideProps = async () => {
  const data: Order[] = [
    {
      id: '123',
      amount: 100,
      shipping: 10,
      images: [
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
      ],
      timestamp: 123456789,
    },
    {
      id: '456',
      amount: 100,
      shipping: 10,
      images: [
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
      ],
      timestamp: 123456789,
    },
  ]

  return {
    props: {
      data
    },
  }
}
