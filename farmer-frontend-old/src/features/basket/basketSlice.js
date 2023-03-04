import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }

      state.items = newBasket;
    },
    emptyBasket: (state) => {
      state.items = [];
    },
  }
})

export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions;

export const selectBasketItems = state => state.basket.items;
export const selectBasketItemsWithId = (state, id) => state.basket.items.filter(item => item.id === id);
export const selectBasketTotal = state => Math.round(state.basket.items.reduce((total, item) => total + item.price, 0));

export default basketSlice.reducer;