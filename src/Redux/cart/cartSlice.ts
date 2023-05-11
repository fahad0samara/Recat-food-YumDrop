import {createSlice} from "@reduxjs/toolkit";
import {
  addItemToCart,
  fetchCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
} from "./cartThunks";

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
    clearrCart: state => {
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
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(
          item => item._id === newItem._id
        );

        if (existingItemIndex !== -1) {
          // Item already exists in cart, update its quantity
          state.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Item does not exist in cart, add it
          state.items.push(newItem);
        }
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
        state.items = action.payload.cart.items;
        if (state.items.length === 0) {
          state.userId = null;
        }
      })

      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(updateCartItemQuantity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const {addItem, removeItem, updateQuantity, setUserId} =
  cartSlice.actions;

export default cartSlice.reducer;
