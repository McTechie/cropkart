import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurant/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basket/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../../sanity';

const BasketScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const groupedItems = useMemo(() => items.reduce((results, item) => {
    (results[item.id] = results[item.id] || []).push(item);
    return results;
  }, {}), [items]);

  return (
    <SafeAreaView className='flex-1 bg-whte'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-rose-500 bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon size={50} color='#f43f5e' />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{ uri: 'https://media.giphy.com/media/nTxpQZNIgu6CQAv9in/giphy.gif' }}
            className='h-7 w-7 bg-gray-200 p-4 rounded-full'
          />
          <Text className='flex-1'>
            Deliver in 50-75 mins
          </Text>
          <TouchableOpacity>
            <Text className='text-rose-500'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-300'>
          {Object.entries(groupedItems).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-rose-500'>
                {items.length} x
              </Text>
              
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className='h-12 w-12 rounded-full'
              />

              <Text className='flex-1'>
                {items[0]?.name}
              </Text>
              
              <Text className='text-gray-600'>
                &#8377;{Math.round(items[0]?.price)}
              </Text>

              <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                <Text className='text-rose-500'>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              &#8377;{Math.round(basketTotal)}
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              &#8377;69
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
              &#8377;{Math.round(basketTotal) + 69}
            </Text>
          </View>
        
          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrder')}
            className='rounded-lg bg-rose-500 p-4'
          >
            <Text className='text-center text-white text-lg font-bold'>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen