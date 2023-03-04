// named imports
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToBasket, removeFromBasket } from '../../redux/slices/basketSlice'

// default imports
import Image from 'next/image'

interface ListingSectionProps {
  highlightBg?: boolean
  title: string
  data: Product[]
}

const ListingSection = ({ highlightBg, title, data }: ListingSectionProps) => {
  // redux logic
  const dispatch = useAppDispatch()
  const basket = useAppSelector(state => state.basket.items)
  const user = useAppSelector(state => state.user.user)

  const handleAddToBasket = (item: Product) => {
    const alreadyInBasket = basket.find(basketItem => basketItem.id === item.id)

    if (alreadyInBasket) {
      dispatch(removeFromBasket(item.id))
    } else {
      dispatch(addToBasket({ ...item, count: 1 }))
    }
  }

  return (
    <section className={`${highlightBg ? 'bg-gray-100' : 'bg-white'} px-4 py-10`}>
      <div className='max-w-screen-lg px-6 py-4 mx-auto'>
        <h2 className='text-3xl md:font-semibold'>
          {title}
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          {data?.map((item: Product) => (
            <div key={item.id} className='p-4 flex flex-col items-center'>
              <button
                disabled={!user}
                onClick={() => handleAddToBasket(item)}
                className='w-40 h-40 relative rounded-full overflow-clip'
              >
                <Image
                  fill
                  src={item.image}
                  alt={item.name}
                  className='rounded-full p-4 object-cover'
                />

                {/* product selected styles */}
                {basket.find(basketItem => basketItem.id === item.id) && (
                  <div className='absolute top-0 w-full h-full bg-emerald-800 bg-opacity-90'>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white text-xs text-center'>
                      <CheckBadgeIcon className='h-14 w-14' />
                      <p>Added to Basket</p>
                    </div>
                  </div>
                )}
              </button>
              
              <h3 className='font-semibold'>
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ListingSection
