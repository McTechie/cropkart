import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, RestaurantScreen, BasketScreen, PreparingOrderScreen, OrderConfirmedScreen } from './src/screens';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name='Home'
              component={HomeScreen}
            />
            <Stack.Screen 
              name='Restaurant'
              component={RestaurantScreen}
            />
            <Stack.Screen 
              name='Basket'
              component={BasketScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen 
              name='PreparingOrder'
              component={PreparingOrderScreen}
              options={{ presentation: 'fullScreenModal' }}
              />
            <Stack.Screen 
              name='OrderConfirmed'
              component={OrderConfirmedScreen}
              options={{ presentation: 'fullScreenModal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
