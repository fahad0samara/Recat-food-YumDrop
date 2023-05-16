// import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {
//   addItemToCart,
//   fetchCart,
//   removeItemFromCart,
//   clearCart,
//   updateCartItemQuantity,
// } from "./cartThunks";

// interface CartItem {
//   _id: string;
//   quantity: number;
//   // add any other properties of the cart item here
// }

// interface CartState {
//   items: CartItem[];
//   loading: boolean;
//   error: string | null;

//   userId: string | null;
//   itemCount: number; // add the itemCount property
// }

// // get the itemCount from localStorage, or initialize it to 0

// const initialItemCount = localStorage.getItem("itemCount") || "0";

// const initialState: CartState = {
//   items: [],
//   loading: false,
//   error: null,
//   userId: null,
//   itemCount: parseInt(initialItemCount),
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItem: (state, action: PayloadAction<CartItem>) => {
//       const itemIndex = state.items.findIndex(
//         item => item._id === action.payload._id
//       );
//       if (itemIndex !== -1) {
//         // Item already exists in cart, update its quantity
//         state.items[itemIndex].quantity += action.payload.quantity;
//       } else {
//         // Item does not exist in cart, add it
//         state.items.push(action.payload);
//       }
//     },
//     removeItem: (state, action: PayloadAction<CartItem>) => {
//       const itemIndex = state.items.findIndex(
//         item => item._id === action.payload._id
//       );
//       if (itemIndex !== -1) {
//         // Item exists in cart, remove it
//         state.items.splice(itemIndex, 1);
//       }
//     },
//     updateQuantity: (
//       state,
//       action: PayloadAction<{_id: string; quantity: number}>
//     ) => {
//       const itemIndex = state.items.findIndex(
//         item => item._id === action.payload._id
//       );
//       if (itemIndex !== -1) {
//         // Item exists in cart, update its quantity
//         state.items[itemIndex].quantity = action.payload.quantity;
//       }
//     },
//     setUserId: (state, action: PayloadAction<string>) => {
//       console.log("userId in reducer:", action.payload);
//       state.userId = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(addItemToCart.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.items = action.payload;
//         state.itemCount = state.items.length;

//         // update the itemCount
//         localStorage.setItem("itemCount", state.itemCount.toString()); // update the itemCount in localStorage
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string | null;
//       })
//       .addCase(fetchCart.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//         state.itemCount = state.items.length; // update the itemCount
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string | null;
//       })
//       .addCase(removeItemFromCart.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeItemFromCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.cart.items;
//         state.itemCount = state.items.length; // update the itemCount

//         localStorage.setItem("itemCount", state.itemCount.toString()); // update the itemCount in localStorage
//       })
//       .addCase(removeItemFromCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string | null;
//       })
//       .addCase(clearCart.fulfilled, state => {
//         state.loading = false;
//         state.items = [];
//         state.itemCount = 0;
//         localStorage.setItem("itemCount", "0"); // update the itemCount
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string | null;
//       })
//       .addCase(updateCartItemQuantity.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//         state.itemCount = state.items.length; // update the itemCount
//       })
//       .addCase(updateCartItemQuantity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string | null;
//       });
//   },
// });

// export const {addItem, removeItem, updateQuantity, setUserId} =
//   cartSlice.actions;

// export default cartSlice.reducer;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  addItemToCart,
  fetchCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
} from "./cartThunks";

interface CartItem {
  _id: string;
  quantity: number;
  // add any other properties of the cart item here
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  userId: string | null;
  itemCount: number; // add the itemCount property
}

// get the itemCount from localStorage, or initialize it to 0
const initialItemCount = localStorage.getItem("itemCount") || "0";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  userId: null,
  itemCount: parseInt(initialItemCount),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        // Item already exists in cart, update its quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // Item does not exist in cart, add it
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        // Item exists in cart, remove it
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{_id: string; quantity: number}>
    ) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        // Item exists in cart, update its quantity
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;

      const storedItemCount = localStorage.getItem("itemCount");
      if (storedItemCount !== null) {
        state.itemCount = parseInt(storedItemCount);
      }
    },
    resetCart: state => {
      state.items = [];
      state.itemCount = 0;
      localStorage.setItem("itemCount", "0");
    },
    setItemCount: (state, action: PayloadAction<number>) => {
      state.itemCount = action.payload;
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
        state.error = null;
        state.items = action.payload;
        state.itemCount = state.items.length;

        localStorage.setItem("itemCount", state.itemCount.toString());
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
        state.itemCount = state.items.length;
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
        state.itemCount = state.items.length;
        localStorage.setItem("itemCount", state.itemCount.toString());
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(clearCart.fulfilled, state => {
        state.loading = false;
        state.items = [];
        state.itemCount = 0;
        localStorage.setItem("itemCount", "0");
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
        state.itemCount = state.items.length;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  setUserId,
  resetCart,
  setItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
