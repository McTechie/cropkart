import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurant/restaurantSlice';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const OrderConfirmedScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className='flex-1 bg-rose-500'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XIcon color='white' size={30} />
          </TouchableOpacity>
          <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 shadow-md z-50'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-4xl font-bold'>35-40 Minutes</Text>
            </View>
            <Image
              source={{ uri: 'https://media.giphy.com/media/acjqMICJohFHxqEZlU/giphy.gif' }}
              className='h-20 w-20'
            />
          </View>

          <Progress.Bar size={30} color='#f43f5e' indeterminate={true} />

          <Text className='mt-3 text-gray-500'>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className='flex-1 z-0 -mt-10'
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier='origin'
          pinColor='#f43f5e'
        />
      </MapView>

      <SafeAreaView className='bg-white flex-row space-x-5 items-center h-28'>
        <Image
          source={{
            uri: 'https://media.giphy.com/media/tpYaafBDNVKn1soXNI/giphy.gif'
          }}
          className='h-14 w-14 bg-gray-300 rounded-full ml-5'
        />

        <View className='flex-1'>
          <Text className='text-lg'>
            Techie No. 30
          </Text>
          <Text className='text-gray-400'>
            Your Rider
          </Text>
        </View>

        <Text className='text-rose-500 text-lg mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default OrderConfirmedScreen