// named imports
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from '@react-google-maps/api'

// default imports
import moment from 'moment'

const data = {
  id: '123',
  amount: 100,
  shipping: 10,
  images: [
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
    'https://vegetablemarketprice.com/resource/images/vegetables/mango-256.png',
  ],
  timestamp: 926598000000,
}

const Track = () => {
  const router = useRouter()
  const { id } = router.query

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: 'AIzaSyDbYH3Gun_JeB0hq-34x19H867jih5BflQ',
  //   libraries: ['places'],
  // })

  // eslint-disable-next-line no-undef
  // const [map, setMap] = useState<google.maps.Map>()
  // const [directionsResponse, setDirectionsResponse] = useState(null)
  // const [distance, setDistance] = useState('')
  // const [duration, setDuration] = useState('')

  // const originRef = useRef<React.MutableRefObject<HTMLInputElement>>(null)
  // const destiantionRef = useRef<React.MutableRefObject<HTMLInputElement>>(null)

  // async function calculateRoute() {
  //   if (originRef.current?.value === '' || destiantionRef.current?.value === '') {
  //     return
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService()
  //   const results = await directionsService.route({
  //     origin: originRef.current?.value,
  //     destination: destiantionRef.current?.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   })
  //   setDirectionsResponse(results)
  //   setDistance(results.routes[0].legs[0].distance.text)
  //   setDuration(results.routes[0].legs[0].duration.text)
  // }

  // function clearRoute() {
  //   setDirectionsResponse(null)
  //   setDistance('')
  //   setDuration('')
  //   originRef.current?.value = ''
  //   destiantionRef.current?.value = ''
  // }


  return (
    <div className='max-w-screen-lg px-6 py-4 mx-auto my-4 mt-20 md:mt-4'>
      <h2 className='text-3xl md:font-semibold border-b border-emerald-500 pb-1'>
        Order #{id}
      </h2>

      <p className='mt-4 text-center md:text-right'>
        Estimated delivery date: <span className='text-emerald-600'>{moment().add(3, 'days').format('DD MMM YYYY')}</span>
      </p>

      <div className='my-4'>
        <h3 className='text-xl md:font-semibold border-emerald-500 pb-1'>
          Order Details:
        </h3>

        <div className='mt-4'>
          <p className='text-gray-600'>
            Date: <span className='font-semibold ml-4'>{moment(data.timestamp).format('DD MMM YYYY')}</span>
          </p>
          <p className='text-gray-600'>
            Shipping: <span className='font-semibold ml-4'>₹{data.shipping}</span>
          </p>
          <p className='text-gray-600'>
            Total: <span className='font-semibold ml-4'>₹{data.amount + data.shipping}</span>
          </p>
        </div>
        
        {/* map goes here */}
        {/* <div>
          <GoogleMap
            center={{ lat: 19.079023, lng: 72.908012 }}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            // onLoad={(map: google.maps.Map) =>  setMap(map)}
          >
            <Marker position={{ lat: 19.079023, lng: 72.908012 }} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div> */}
      </div>
    </div>
  )
}

export default Track
