// named imports
import { useRouter } from 'next/router'

// default imports
import moment from 'moment'

const data = {
  id: '123',
  amount: 100,
  shipping: 10,
  images: [
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
  ],
  timestamp: 926598000000,
}

const Track = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>
      <h2 className='text-3xl md:font-semibold border-b border-emerald-500 pb-1'>
        Order #{id}
      </h2>

      <p className='mt-4 text-center md:text-right'>
        Estimated delivery date: <span className='text-emerald-600'>{moment().add(3, 'days').format('DD MMM YYYY')}</span>
      </p>

      <div className='my-4'>
        <h3 className='text-xl md:font-semibold border-emerald-500 pb-1'>
          Order Details:
        </h3>

        <div className='mt-4'>
          <p className='text-gray-600'>
            Date: <span className='font-semibold ml-4'>{moment(data.timestamp).format('DD MMM YYYY')}</span>
          </p>
          <p className='text-gray-600'>
            Shipping: <span className='font-semibold ml-4'>₹{data.shipping}</span>
          </p>
          <p className='text-gray-600'>
            Total: <span className='font-semibold ml-4'>₹{data.amount + data.shipping}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Track
