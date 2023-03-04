// named imports
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToBasket, removeAllFromBasket, removeFromBasket } from '../../redux/slices/basketSlice'
import { TrashIcon } from '@heroicons/react/20/solid'

// default imports
import Image from 'next/image'

const CurrentBasket = () => {
  // redux logic
  const dispatch = useAppDispatch()
  const basket = useAppSelector(state => state.basket.items)
  const getCount = (id: string) => basket.find(item => item.id === id)?.count

  const handleAddItemToBasket = (item: BasketItem) => {
    dispatch(addToBasket(item))
  }

  const handleRemoveItemFromBasket = (id: string) => {
    dispatch(removeFromBasket(id))
  }

  const handleRemoveAllItemsFromBasket = (id: string, name: string) => {
    const count = getCount(id)
    const userDecision = confirm('You are trying to delete ' + name + ' (Quantity: ' + count + ') from the Basket')

    if (userDecision) {
      dispatch(removeAllFromBasket(id))
    }
  }

  return (
    <div className='space-y-8'>
      {basket?.map((item: BasketItem, index: number) => (
        <motion.div
          key={item.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='grid grid-cols-5 border-[1.5px] border-gray-300 shadow-md rounded-lg p-5'
        >
          <Image
            src={item?.image}
            alt={item?.name}
            width={200}
            height={200}
            className='object-contain'
          />

          <div className='col-span-4 mx-5'>
            <p className='text-lg font-bold'>
              {item?.name}
            </p>

            <p className='text-xs my-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ab impedit voluptate deserunt harum nostrum minus accusamus eum ipsa a odit, aliquid consequuntur quas exercitationem sapiente, error veniam. Molestiae, eligendi.
            </p>

            <div className='mb-5'>
              &#8377;{item?.price} <span className='text-red-400 ml-1 text-sm line-through'>{Math.round(item?.price * 1.5)}</span>
            </div>

            <div className='flex items-center mt-2'>
              <button className='btnAlt' onClick={() => handleRemoveItemFromBasket(item?.id)}>-</button>
              <span className='mx-3'>{getCount(item?.id)}</span>
              <button className='btnAlt' onClick={() => handleAddItemToBasket(item)}>+</button>
              <button className='btnDelete ml-3' onClick={() => handleRemoveAllItemsFromBasket(item?.id, item?.name)}>
                <TrashIcon className='h-5' />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default CurrentBasket
