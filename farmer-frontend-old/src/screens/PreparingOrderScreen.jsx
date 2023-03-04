import { SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { emptyBasket } from '../features/basket/basketSlice';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setTimeout(() => {
      dispatch(emptyBasket());
      navigation.navigate('OrderConfirmed');
    }, 4000);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-[#f9b9c7] items-center justify-center'>
      <Animatable.Image
        source={require('../../assets/orderLoading.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg mt-16 text-rose-600 font-bold text-center'
      >
        Waiting for the Restaurant
      </Animatable.Text>

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg mb-10 text-rose-600 font-bold text-center'
      >
        to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color='#f43f5e' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen