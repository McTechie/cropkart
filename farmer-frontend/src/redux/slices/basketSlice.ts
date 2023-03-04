import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface basketState {
  items: BasketItem[]
}

// Define the initial state using that type
const initialState: basketState = {
  items: [],
}

// Define the slice
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    fetchBasketFromStorage: (state, action: PayloadAction<BasketItem[]>) => {
      state.items = action.payload
    },
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      
      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket[index].count += 1
      } else {
        newBasket.push(action.payload)
      }

      state.items = newBasket
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload)

      let newBasket = [...state.items]

      if (index >= 0) {
        if (newBasket[index].count > 1) {
          newBasket[index].count -= 1
        } else {
          newBasket.splice(index, 1)
        }
      }

      state.items = newBasket
    },
    removeAllFromBasket: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload)

      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      }

      state.items = newBasket
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  removeFromBasket,
  removeAllFromBasket,
  fetchBasketFromStorage
} = basketSlice.actions

export default basketSlice.reducer
