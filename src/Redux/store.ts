import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
