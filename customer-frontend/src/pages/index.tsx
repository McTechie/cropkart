// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { useEffect } from 'react'
import { LandingLayout } from '../layouts'
import { ListingSection } from '../components'
import { auth } from '../firebase'
import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/slices/userSlice'

interface HomePageProps {
  fruitsData: Product[]
  veggiesData: Product[]
}

const Home: NextPage<HomePageProps> = ({ fruitsData, veggiesData }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = auth?.currentUser

    if (user) {
      dispatch(setUser({
        email: user.email!,
        name: user.displayName!,
        phone: user.phoneNumber!,
      }))
    }
  }, [])

  return (
    <LandingLayout>
      <div className='mt-16 md:mt-0'>
        <ListingSection
          highlightBg
          title='Fresh Fruits to choose from'
          data={fruitsData}
        />
      </div>
      <ListingSection
        title='Delicious Veggies for your palette'
        data={veggiesData}
      />
    </LandingLayout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
  // const data = await res.json()

  const data = {
    fruitsData: [
      {
        id: '1',
        name: 'Apple',
        image: 'https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '2',
        name: 'Mango',
        image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '3',
        name: 'Banana',
        image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '4',
        name: 'Orange',
        image: 'https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '5',
        name: 'Kiwi',
        image: 'https://images.pexels.com/photos/54370/pexels-photo-54370.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '6',
        name: 'Pomegranate',
        image: 'https://images.pexels.com/photos/1435741/pexels-photo-1435741.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '7',
        name: 'Pineapples',
        image: 'https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '8',
        name: 'Guava',
        image: 'https://images.pexels.com/photos/4400282/pexels-photo-4400282.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
    ],
    veggiesData: [
      {
        id: '1V',
        name: 'Tomatoes',
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '2V',
        name: 'Potatoes',
        image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '3V',
        name: 'Spinach',
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '4V',
        name: 'Onions',
        image: 'https://images.pexels.com/photos/175415/pexels-photo-175415.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '5V',
        name: 'Carrot',
        image: 'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '6V',
        name: 'Cabbage',
        image: 'https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '7V',
        name: 'Tomatoes',
        image: 'https://images.pexels.com/photos/3036364/pexels-photo-3036364.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
      {
        id: '8V',
        name: 'Cucumber',
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
      },
    ],
  }

  const { fruitsData, veggiesData } = data

  return {
    props: {
      fruitsData,
      veggiesData,
    },
  }
}
