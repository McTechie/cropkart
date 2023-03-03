// named imports
import { motion } from 'framer-motion'

// default imports
import moment from 'moment'
import Image from 'next/image'

interface PreviousOrdersProps {
  data: Order[]
}

const PreviousOrders = ({ data }: PreviousOrdersProps) => {
  return (
    <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>
      <h2 className='text-3xl md:font-semibold border-b border-emerald-500 pb-1'>
        Your Orders
      </h2>

      <p className='mt-4 text-center md:text-left'>
        {data?.length} order&#40;s&#41;
      </p>

      <div className='mt-5 space-y-8'>
        {data?.map((item: Order, index: number) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 * index }}
            viewport={{ once: true }}
            className='relative border-[1.5px] border-gray-300 shadow-sm rounded-lg'
          >
            <div className='flex items-center p-5 space-x-10 bg-gray-100 text-sm text-gray-600 rounded-t-lg'>
              <div>
                <p className='text-xs font-bold uppercase text-emerald-700'>Order Placed</p>
                <p className='font-light mt-1'>{moment.unix(item?.timestamp).format('DD MMM YYYY')}</p>
              </div>
      
              <div>
                <p className='text-xs font-bold uppercase text-emerald-700'>Total</p>
                <p className='font-light mt-1'>
                  &#8377;{item?.amount} - Delivery Charges &#8377;{item?.shipping}
                </p>
              </div>
      
              <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-emerald-600'>
                {item.images?.length} item&#40;s&#41;
              </p>
      
              <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap font-light'>
                ORDER # {item?.id}
              </p>
            </div>
      
            <div className='p-5 sm:p-10'>
              <div className='flex space-x-6 overflow-x-auto'>
                {item.images?.map((image, idx) => (
                  <Image key={idx} src={image} alt='' width={150} height={150} objectFit='contain' />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PreviousOrders
