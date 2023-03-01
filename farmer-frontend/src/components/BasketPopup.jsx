import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basket/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketPopup = () => {
  const navigation = useNavigation();

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className='bg-rose-400 mx-5 p-4 rounded-lg flex-row items-center space-x-1'
        >
        <Text className='text-white text-lg font-extrabold bg-[#e11d48] py-1 px-2'>{items.length}</Text>
        <Text className='flex-1 text-white text-lg text-center font-extrabold'>View Basket</Text>
        <Text className='text-white text-lg font-extrabold'>&#8377;{basketTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketPopup