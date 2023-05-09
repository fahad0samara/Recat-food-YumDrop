import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex === -1) {
        // Item does not exist in cart, add it with quantity 1
        state.items.push({...action.payload, quantity: 1});
      } else {
        // Item already exists in cart, update its quantity
        state.items[itemIndex].quantity += 1;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        // Item exists in cart, remove it
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        // Item exists in cart, update its quantity
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addItem, removeItem, updateQuantity, clearCart} =
  cartSlice.actions;

export default cartSlice.reducer;
