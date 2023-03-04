// named imports
import { useEffect } from 'react'
import { Footer, Header } from '../components'
import { useAppDispatch } from '../redux/hooks'
import { setLocation } from '../redux/slices/locationSlice'

// default imports
import Head from 'next/head'
import Image from 'next/image'

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchCoordinates = async (latitude: number, longitude: number) => {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_API_TOKEN}`)
      const data = await res.json()
  
      dispatch(setLocation({
        latitude,
        longitude,
        city: data.results[0].components.city,
      }))
    }

    const handleGetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords
  
          fetchCoordinates(latitude, longitude)
        })
      } else {
        alert('Geolocation is not supported by this browser')
      }
    }

    handleGetLocation()
  }, [])

  return (
    <div>
      <Head>
        <title>Where India loves to order - CropKart</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='relative'>
        <Image
          src='/banner.jpeg'
          alt='banner'
          width={1920}
          height={500}
        />
        <div className='absolute inset-0 bg-black bg-opacity-50' />

        {/* text in center */}
        <h1 className='hidden md:block text-gray-200 absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-center top-1/2 left-1/2'>
          Where India loves to order from...
        </h1>
      </div>

      <main className='mx-auto bg-white text-gray-600'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default LandingLayout
