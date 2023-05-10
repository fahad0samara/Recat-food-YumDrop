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
