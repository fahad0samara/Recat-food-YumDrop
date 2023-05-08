import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface FetchUserDataResponse {
  user: UserData;
  isAdmin: boolean;
}

export const register = createAsyncThunk(
  "auth/register",
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Extract the error message and status code from the response data
        const {message} = error.response.data;
        const statusCode = error.response.status;
        console.log("An error occurred:", message, "Status code:", statusCode);

        // Return an object with the error message and status code as the rejected value
        return rejectWithValue({message, statusCode});
      }
      // Rethrow the error if there's no error payload
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/auth/login",
        credentials
      );
      console.log("====================================");
      console.log();
      console.log("====================================");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue, getState}) => {
    const {token} = getState().auth;
    try {
      await axios.post("http://localhost:1337/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get<FetchUserDataResponse>(
        "http://localhost:1337/auth/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: "Failed to fetch user data",
        error: err.message,
      });
    }
  }
);


