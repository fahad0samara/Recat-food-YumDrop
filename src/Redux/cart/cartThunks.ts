import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {setItemCount} from "./cartSlice";

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (
    {
      itemId,
      quantity,
      userId,
    }: {itemId: string; quantity: number; userId: string},
    {dispatch, rejectWithValue}
  ) => {
    try {
      const response = await axios.post("http://localhost:1337/cart/add", {
        userId,
        itemId,
        quantity,
      });
      const newCount = response.data.cart.items;
      dispatch(setItemCount(newCount));
      return response.data.cart.items; // Return the updated cart items
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response?.data?.message) ||
          "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/cart/cart/${userId}`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response?.data?.message) ||
          "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (
    {userId, itemId}: {userId: string; itemId: string},
    {rejectWithValue}
  ) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/cart/delete/${userId}/${itemId}`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response?.data?.message) ||
          "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/cart/clear/${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response?.data?.message) ||
          "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    {
      userId,
      itemId,
      quantity,
    }: {userId: string; itemId: string; quantity: number},
    {rejectWithValue}
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:1337/cart/updateQuantity/${userId}/${itemId}`,
        {
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response?.data?.message) ||
          "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);
