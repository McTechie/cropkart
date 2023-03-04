// named imports
import { useRouter } from 'next/router'
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'

// default imports
import Head from 'next/head'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter()
  
  return (
    <div>
      <Head>
        <title>CropKart for Farmers</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='border-b-2 shadow-sm'>
        <nav className='sticky top-0 z-50 bg-white shadow-md md:hidden text-gray-600 p-6'>
          <div className='flex justify-between'>
            <button
              onClick={() => router.back()}
              className='text-gray-600'
            >
              <ArrowUturnLeftIcon className='h-6 w-6' />
            </button>

            <h1 className='text-3xl font-bold'>
              <span>crop</span>
              <span className='text-emerald-600'>kart</span>
            </h1>
          </div>
        </nav>

        <nav className='relative max-w-screen-lg mx-auto hidden md:flex bg-white text-gray-600 py-4 px-6 justify-between items-center space-x-20'>
          <button
            onClick={() => router.back()}
            className='text-gray-600'
          >
            <ArrowUturnLeftIcon className='h-6 w-6' />
          </button>

          <Link href='/'>
            <h1 className='text-3xl font-bold'>
              <span>crop</span>
              <span className='text-emerald-600'>kart</span>
            </h1>
          </Link>
        </nav>
      </header>

      <main className='max-w-screen-sm my-20 mx-auto bg-white text-gray-600'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
