import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "helper";
import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER SING IN  FUNCTIONALITY*********************

export const SignIn = createAsyncThunk(
  "Authentication/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(ENDPOINT + "user/login", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        Cookies.set("token", res.data.data?.accessToken);
        window.location.href = "/user-panel";
        return {
          data: res.data,
        };
      }
    } catch (error) {
      Alert.ERROR(error?.response?.data?.error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: {},
  errors: {},
  loading: false,
};
const authSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(SignIn.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default authSlice.reducer;
