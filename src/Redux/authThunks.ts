import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}): Promise<any> => {
    const response = await axios.post("http://localhost:1337/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (userData): Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:1337/auth/register",
        userData
      );
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);
