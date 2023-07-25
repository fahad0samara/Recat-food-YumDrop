import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface AddItemToCartArgs {
  itemId: string;
  quantity: number;
  userId: string;
}

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (
    {itemId, quantity, userId}: AddItemToCartArgs,
    { rejectWithValue}
  ) => {
    try {
      const response = await axios.post("http://localhost:1337/cart/add", {
        userId,
        itemId,
        quantity,
      });
      // update itemCount
      return response.data;
    } catch (error: unknown) {
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
    } catch (error: unknown) {
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

interface RemoveItemFromCartArgs {
  userId: string;
  itemId: string;
}

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({userId, itemId}: RemoveItemFromCartArgs, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/cart/delete/${userId}/${itemId}`
      );

      return response.data;
    } catch (error: unknown) {
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
    } catch (error: unknown) {
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

interface UpdateCartItemQuantityArgs {
  userId: string;
  itemId: string;
  quantity: number;
}

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    {userId, itemId, quantity}: UpdateCartItemQuantityArgs,
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
    } catch (error: unknown) {
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
