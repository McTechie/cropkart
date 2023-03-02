// named imports
import { useEffect } from 'react'
import { Nunito_Sans } from 'next/font/google'
import { Footer, Header } from '../components'
import { useAppDispatch } from '../redux/hooks'
import { setLocation } from '../redux/slices/locationSlice'

// default imports
import Head from 'next/head'

// font style for the dashboard
const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--nunito-font',
})

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const fetchCoordinates = async (latitude: number, longitude: number) => {
  //     const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_API_TOKEN}`)
  //     const data = await res.json()
  
  //     dispatch(setLocation({
  //       latitude,
  //       longitude,
  //       city: data.results[0].components.city,
  //     }))
  //   }

  //   const handleGetLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         const { latitude, longitude } = position.coords
  
  //         fetchCoordinates(latitude, longitude)
  //       })
  //     } else {
  //       alert('Geolocation is not supported by this browser')
  //     }
  //   }

  //   handleGetLocation()
  // }, [])

  return (
    <div className={`${nunito.variable} font-sans`}>
      <Head>
        <title>Where India loves to order - CropKart</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='min-h-screen mx-auto bg-white text-gray-600'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default LandingLayout
