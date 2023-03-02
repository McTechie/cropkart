import Image from 'next/image'

interface ListingSectionProps {
  highlightBg?: boolean
  title: string
  data: Product[]
}

const ListingSection = ({ highlightBg, title, data }: ListingSectionProps) => {
  return (
    <section className={`${highlightBg ? 'bg-gray-100' : 'bg-white'} px-4 py-10`}>
      <div className='max-w-screen-lg px-6 py-4 mx-auto'>
        <h2 className='text-2xl font-semibold'>
          {title}
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {data?.map((item: Product) => (
            <div key={item.id} className='p-4 flex flex-col items-center'>
              <div className='w-32 h-32 relative'>
                <Image
                  fill
                  src={item.image}
                  alt={item.name}
                  className='rounded-full bg-white border-2 p-4 object-contain'
                />
              </div>
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
