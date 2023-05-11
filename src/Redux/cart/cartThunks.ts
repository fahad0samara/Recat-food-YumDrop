import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// // Add item to cart

// Add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({itemId, quantity, userId}, {rejectWithValue}) => {
    try {
      const response = await axios.post("http://localhost:1337/cart/add", {
        userId,
        itemId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.log(error.response);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to add item to cart";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

// fetchCart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/cart/cart/${userId}`
      );

      return response.data;
    } catch (error) {
      console.log(error.response);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to fetch cart";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

// // Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({userId, itemId}, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/cart/delete/${userId}/${itemId}`
      );

      return response.data;
    } catch (error) {
      console.log(error.response);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to remove item from cart";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/cart/clear/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to clear cart";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);

// Update item quantity in cart

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({userId, itemId, quantity}, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.put(
        `http://localhost:1337/cart/updateQuantity/${userId}/${itemId}`,
        {quantity}
      );
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Failed to update item quantity in cart";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);
