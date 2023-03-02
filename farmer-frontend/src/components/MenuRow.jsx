import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { urlFor } from '../../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basket/basketSlice';

const MenuRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const handleAddToBasket = () => {
    dispatch(addToBasket({
      id,
      name,
      description,
      price,
      image,
    }));
  }

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(isPressed => !isPressed)}
        className={`bg-white border p-4 border-gray-300 ${isPressed && 'border-b-0'}`}
      >
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <Text className='text-gray-400 mt-2'>&#8377;{Math.round(price)}</Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#f3f3f4',
              }}
              source={{ uri: urlFor(image).url() }}
              className='h-20 w-20 bg-gray-300 p-4'
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity
              onPress={handleRemoveFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? '#f43f5e' : 'gray'}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={handleAddToBasket}>
              <PlusCircleIcon
                size={40}
                color='#f43f5e'
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default MenuRow