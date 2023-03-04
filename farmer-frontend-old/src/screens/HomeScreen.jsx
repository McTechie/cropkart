import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { Categories, FeaturedRow } from '../components';
import sanityClient from '../../sanity';

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then(data => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image
          source={{ uri: 'https://media.giphy.com/media/gsr9MG7bDvSRWWSD1Y/giphy.gif' }}
          className='h-7 w-7 bg-gray-200 p-4 rounded-full'
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>
            Deliver Now!
          </Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDownIcon size={20} color='#f43f5e' />
          </Text>
        </View>

        <Image
          source={{ uri: 'https://media.giphy.com/media/tpYaafBDNVKn1soXNI/giphy.gif' }}
          className='h-9 w-9 bg-gray-200 p-4 rounded-full'
        />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
          <SearchIcon size={20} color='gray' />
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default' />
        </View>
        <AdjustmentsIcon color='#f43f5e' />
      </View>

      {/* Feed */}
      <ScrollView
        className='bg-gray-100'
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        <Categories />

        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen