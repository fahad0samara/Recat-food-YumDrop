import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {clearUserData} from "./authSlice";

export interface UserData {
  _id?: string;
  firstName: string;

  email: string;
  password: string;
  role: string;
}
interface LoginResponse {
  user: unknown;
  isAdmin: boolean;
  token: string;
}

interface User {
  user: unknown;
  isAdmin: boolean;
  id: number;
  email: string;
  name: string;
}

// Register user
export const register = createAsyncThunk<
  User,
  UserData,
  {rejectValue: {message: string; statusCode: number}}
>("auth/register", async (userData, {rejectWithValue}) => {
  try {
    const response = await axios.post<User>(
      " https://api-api-arab.azurewebsites.net/auth/register",
      userData
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
});

// Login user
export const login = createAsyncThunk<
  LoginResponse,
  UserData,
  {rejectValue: string}
>("auth/login", async (credentials, {rejectWithValue}) => {
  try {
    const response = await axios.post<LoginResponse>(
      " https://api-api-arab.azurewebsites.net/auth/login",
      credentials
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
});

// Logout user
export const logout = createAsyncThunk<void, void, {rejectValue: string}>(
  "auth/logout",
  async (_, {dispatch, rejectWithValue}) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is already logged out");
      return;
    }
    try {
      await axios.post(
        " https://api-api-arab.azurewebsites.net/auth/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(clearUserData());

      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to fetch user data";
        return rejectWithValue(message);
      }
      throw error;
    }
  }
);
export const fetchUserData = createAsyncThunk<
  User,
  void,
  {rejectValue: {message: string; error: string}}
>("auth/fetchUserData", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");

  if (!token) {
    thunkAPI.dispatch(logout()); // Logout the user if token is not available
    return thunkAPI.rejectWithValue({
      message: "User is not authenticated",
      error: "",
    });
  }

  try {
    const response = await axios.get<User>(
      " https://api-api-arab.azurewebsites.net/auth/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to fetch user data";
      const err = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue({message, error: err});
    }
    throw error;
  }
});
