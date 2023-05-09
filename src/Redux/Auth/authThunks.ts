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
  user: any;
  isAdmin: boolean;
  token: string;
}

interface User {
  user: any;
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
      "http://localhost:1337/auth/register",
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
      "http://localhost:1337/auth/login",
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
      await axios.post("http://localhost:1337/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    return thunkAPI.rejectWithValue({
      message: "User is not authenticated",
      error: "",
    });
  }

  try {
    const response = await axios.get<User>("http://localhost:1337/auth/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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


