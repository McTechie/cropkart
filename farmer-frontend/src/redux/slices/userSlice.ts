import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface userState {
  user: User | null
}

// Define the initial state using that type
const initialState: userState = {
  user: null,
}

// Define the slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
} = userSlice.actions

export default userSlice.reducer
