// named imports
import { motion } from 'framer-motion'
import { useAppSelector } from '../../redux/hooks'

// default imports
import Image from 'next/image'

import { CheckBadgeIcon } from '@heroicons/react/24/solid'
// import { loadStripe } from '@stripe/stripe-js'
// import axios from 'axios'

// const stripePromise = loadStripe(process.env.stripe_public_key);

const Sidebar = () => {
  const basket = useAppSelector(state => state.basket.items)
  const total = basket.reduce((total, item) => total + item.price, 0)
  const totalItems = basket.reduce((total, item) => total + item.count, 0)

  const createCheckoutSession = async () => {
    // const stripe = await stripePromise

    // const checkoutSession = await axios.post('/api/create-checkout-session', {
    //   items,
    //   email: session.user.email
    // })
    
    // const res = await stripe.redirectToCheckout({
    //   sessionId: checkoutSession.data.id
    // })

    // if (res.error) {
    //   alert(res.error.message)
    // } else {
    //   localStorage.setItem('techiebay cart', JSON.stringify([]))
    // }
  }

  const handleCheckout = () => {
    // !session ? signIn() : createCheckoutSession()
  }

  return (
    <div className='flex flex-col bg-white border-[1.5px] border-gray-300 shadow-md rounded-lg px-20 py-4'>
      {totalItems > 0 && (
        <>
          <h2 className='whitespace-nowrap my-4'>
            Subtotal &#40;{totalItems} items&#41;:
            <span className='ml-2 font-bold'>&#8377;{total}</span>
          </h2>

          <p className='animate-bounce text-sm rounded-md flex items-center text-green-700 bg-green-200 p-1 mt-2 mb-3'>
            <CheckBadgeIcon className='h-5 mr-3' />
            Get the order delivered within 4-5 days
          </p>

          {basket.map((item: BasketItem, idx: number) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='hidden lg:grid grid-cols-3 shadow-md p-4 m-2 max-w-sm xl:max-w-md'
            >
              <Image
                src={item?.image}
                alt={item?.name}
                width={100}
                height={100}
                className='object-contain'
              />
        
              <div className='col-span-2 ml-4 space-y-1'>
                <p className='text-xs xl:text-sm font-bold'>
                  {item?.name}
                </p>
                
                
                <p className='flex items-center text-xs italic font-normal text-gray-600'>
                  <span className='mr-3'>Count: {item?.count}</span>
                </p>
        
                <div className='mb-5'>
                  &#8377;{item?.price} <span className='text-red-400 ml-1 text-sm line-through'>{Math.round(item?.price * 1.5)}</span>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            role='link'
            onClick={handleCheckout}
            className='btn mt-4 bg-emerald-500 py-2 rounded-lg text-white'
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
 
export default Sidebar
