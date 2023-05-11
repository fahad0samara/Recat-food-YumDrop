import {createSlice} from "@reduxjs/toolkit";
import {addItemToCart, fetchCart, removeItemFromCart} from "./cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    userId: null,
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
    setUserId: (state, action) => {
      console.log("userId in reducer:", action.payload);
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addItemToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(removeItemFromCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const {addItem, removeItem, updateQuantity, clearCart, setUserId} =
  cartSlice.actions;

export default cartSlice.reducer;
