import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import cartReducer from "./cart/cartSlice";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
