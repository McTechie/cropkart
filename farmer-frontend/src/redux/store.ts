import { configureStore } from '@reduxjs/toolkit'

// slices of global state
import userReducer from './slices/userSlice'
import basketReducer from './slices/basketSlice'
import locationReducer from './slices/locationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    location: locationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
