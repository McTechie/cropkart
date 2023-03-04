// named imports
import { motion } from 'framer-motion'
import { useAppSelector } from '../../redux/hooks'
import { loadStripe } from '@stripe/stripe-js'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const Sidebar = () => {
  // redux logic
  const basket = useAppSelector(state => state.basket.items)
  const total = basket.reduce((total, item) => total + item.count * item.price, 0)
  const totalItems = basket.reduce((total, item) => total + item.count, 0)
  const email = useAppSelector(state => state.user.user?.email)
  const phone = useAppSelector(state => state.user.user?.phone)

  const handleCheckout = async () => {
    const stripe = await stripePromise

    const checkoutSession = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: basket,
        email,
        phone
      })
    })

    const { id } = await checkoutSession.json()
    
    const res = await stripe?.redirectToCheckout({
      sessionId: id
    })
  }

  return (
    <div className='flex flex-col bg-white border-[1.5px] border-gray-300 shadow-md rounded-lg px-20 py-4 md:px-8'>
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
              transition={{ duration: 0.5 * idx }}
              key={idx}
              className='p-2 m-2 w-56'
            >
              <div className='ml-4 flex space-x-4'>
                <p className='text-xs xl:text-sm font-bold'>
                  x {item?.count} {item?.name}
                </p>
        
                <div className='flex'>
                  <p>&#8377;{item?.price}</p>
                  <p className='text-red-400 ml-2 text-sm line-through'>{Math.round(item?.price * 1.5)}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            role='link'
            onClick={handleCheckout}
            className='mt-4 bg-emerald-500 py-2 rounded-lg text-white'
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
 
export default Sidebar
