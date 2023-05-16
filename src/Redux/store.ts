import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppThunk and AppDispatch types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default store;
