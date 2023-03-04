// named imports
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth'
import { BackspaceIcon, ChevronDownIcon, ClockIcon, GlobeAsiaAustraliaIcon, MapPinIcon, ShoppingCartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setLocation } from '../../redux/slices/locationSlice'
import { auth } from '../../firebase'

// default imports
import Link from 'next/link'

const Header = () => {
  const router = useRouter()

  // redux logic
  const dispatch = useAppDispatch()
  const location = useAppSelector(state => state.location.city)
  const user = useAppSelector(state => state.user.user)

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false)

  const fetchCoordinates = async (latitude: number, longitude: number) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_API_TOKEN}`)
    const data = await res.json()

    dispatch(setLocation({
      latitude,
      longitude,
      city: data.results[0].components.city,
    }))
  }

  const handleGetLocation = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords

        fetchCoordinates(latitude, longitude)

        setIsLocationModalOpen(isLocationModalOpen => !isLocationModalOpen)
      })
    } else {
      alert('Geolocation is not supported by this browser')
    }
  }

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const confirmLogout = confirm('Are you sure you want to logout?')

    if (!confirmLogout) return

    try {
      await signOut(auth)
      router.reload()
    } catch (error) {
      alert('Error logging out')
    }
  }

  return (
    <header className='border-b-2 shadow-sm'>
      {/* navbar for mobile screens */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md md:hidden text-gray-600 py-3 flex ${user ? 'justify-center' : 'justify-between px-6'}`}>
        {!user && (
          <Link href='/login'>
            <ArrowRightOnRectangleIcon className='h-10 w-10 text-gray-600' />
          </Link>
        )}

        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold relative'>
            <span>crop</span>
            <span className='text-emerald-600'>kart</span>
            <span className='absolute left-0 -bottom-3 text-xs'>Farmers</span>
          </h1>

          {/* location */}
          {location && (
            <button
              onClick={handleGetLocation}
              className='flex space-x-2 items-center mt-2 -mb-2'
            >
              <MapPinIcon className='w-4 h-4 text-emerald-600 relative bottom-[0.15rem]' />
              <span>{location}</span>
            </button>
          )}
        </div>
        
        {user && (
          <div className='fixed bottom-0 left-0 bg-slate-700 text-white w-full h-20 z-50 flex justify-evenly items-center'>
            <Link href='/orders' className='flex flex-col items-center'>
              <ClockIcon className='h-7 w-7' />
              <span className='text-sm mt-1'>Orders</span>
            </Link>
            <Link href='/basket' className='flex flex-col items-center'>
              <ShoppingCartIcon className='h-7 w-7' />
              <span className='text-sm mt-1'>Basket</span>
            </Link>
            <button onClick={handleLogout} className='flex flex-col items-center'>
              <BackspaceIcon className='h-7 w-7' />
              <span className='text-sm mt-1'>Logout</span>
            </button>
          </div>
        )}
      </nav>
      
      {/* navbar for desktop screens */}
      <nav className='max-w-screen-lg mx-auto hidden md:flex bg-white text-gray-600 py-4 px-6 justify-between items-center space-x-20'>
        {/* navbar brand */}
        <Link href='/'>
          <h1 className='text-3xl font-bold relative'>
            <span>crop</span>
            <span className='text-emerald-600'>kart</span>
            <span className='absolute left-0 -bottom-3 text-xs'>Farmers</span>
          </h1>
        </Link>
        
        {/* search bar */}
        <div className='flex-1 grid grid-cols-10 border-2 rounded-lg'>
          <div className='col-span-3 flex items-center px-2 border-r-2 mr-4 overflow-hidden'>
            <div className='flex flex-1 items-center space-x-2'>
              <MapPinIcon className='w-4 h-4 text-emerald-600 relative bottom-[0.15rem]' />

              <p className='mr-14'>
                {location ? location : <span className='text-gray-500'>Loading...</span>}
              </p>
            </div>
            
            <button
              className='rounded-full hover:bg-gray-200'
              onClick={() => setIsLocationModalOpen(isLocationModalOpen => !isLocationModalOpen)}
            >
              <ChevronDownIcon className={`w-6 h-6 transition-all ease-in-out duration-300 ${isLocationModalOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </div>
          
          <input
            type='text'
            id='search'
            name='search'
            placeholder='Search for vegetables or fruits'
            className='col-span-7 p-2 w-full rounded-lg focus:outline-none'
          />
        </div>
        
        {/* location modal */}
        {isLocationModalOpen && (
          <button
            className='absolute top-16 left-[8.8rem] w-60 border-2 rounded-lg bg-white px-2 py-2 flex items-start space-x-3 hover:bg-gray-50'
            onClick={handleGetLocation}
          >
            <div className='ml-1 mt-0.5'>
              <GlobeAsiaAustraliaIcon className='w-4 h-4 text-orange-500 opacity-80' />
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-orange-500 opacity-80 font-semibold text-sm'>Get Current Location</p>
              <p className='text-[0.7rem] text-gray-400'>Using current location</p>
            </div>
          </button>
        )}
        
        {/* user links */}
        {user ? (
          <div className='flex space-x-6 text-gray-500 opacity-90'>
            <Link href='/orders' className='flex space-x-2 hover:text-gray-700 hover:opacity-100 group'>
              <ClockIcon className='h-6 w-6 group-hover:-translate-y-[0.15rem] group-hover:-translate-x-[0.15rem] transition-all duration-300 ease-in-out' />
              <span>Orders</span>
            </Link>
            <Link href='/basket' className='flex space-x-2 hover:text-gray-700 hover:opacity-100 group'>
              <ShoppingCartIcon className='h-6 w-6 group-hover:-translate-y-[0.15rem] group-hover:-translate-x-[0.15rem] transition-all duration-300 ease-in-out' />
              <span>Basket</span>
            </Link>
            <button onClick={handleLogout} className='flex space-x-2 hover:text-gray-700 hover:opacity-100 group'>
              <BackspaceIcon className='h-6 w-6 group-hover:-translate-y-[0.15rem] group-hover:-translate-x-[0.15rem] transition-all duration-300 ease-in-out' />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link
            href='/login'
            className='text-gray-500 hover:text-gray-800 text-lg opacity-80 font-semibold'
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
