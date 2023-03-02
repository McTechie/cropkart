// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { LandingLayout } from '../layouts'
import { ListingSection } from '../components'

interface HomePageProps {
  fruitsData: Product[]
  veggiesData: Product[]
}

const Home: NextPage<HomePageProps> = ({ fruitsData, veggiesData }) => {
  return (
    <LandingLayout>
      <ListingSection
        highlightBg
        title='Fresh Fruits to choose from'
        data={fruitsData}
      />
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
        id: 1,
        name: 'Apple',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 2,
        name: 'Mango',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 3,
        name: 'Banana',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 4,
        name: 'Orange',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 5,
        name: 'Apple',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 6,
        name: 'Mango',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 7,
        name: 'Banana',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
      {
        id: 8,
        name: 'Orange',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
        price: 100,
      },
    ],
    veggiesData: [
      {
        id: 1,
        name: 'Cauliflower',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 2,
        name: 'Potatoes',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 3,
        name: 'Tomatoes',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 4,
        name: 'Onions',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 5,
        name: 'Cauliflower',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 6,
        name: 'Potatoes',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 7,
        name: 'Tomatoes',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
        price: 100,
      },
      {
        id: 8,
        name: 'Onions',
        image: 'https://vegetablemarketprice.com/resource/images/vegetables/onionBig-256.png',
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
