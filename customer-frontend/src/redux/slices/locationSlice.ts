import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface locationState {
  latitude: number;
  longitude: number;
  city: string;
}

// Define the initial state using that type
const initialState: locationState = {
  latitude: 0,
  longitude: 0,
  city: '',
}

// Define the slice
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<locationState>) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
      state.city = action.payload.city
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setLocation,
} = locationSlice.actions

export default locationSlice.reducer
