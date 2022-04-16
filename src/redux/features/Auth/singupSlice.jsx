import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import axios from "axios";
import Cookies from "js-cookie";

// ********************* USER SING UP  FUNCTIONALITY*********************

const ENDPOINT = process.env.REACT_APP_BASE_URL;

export const SingUp = createAsyncThunk(
  "AuthSignUp/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(ENDPOINT + "user/register", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        Alert.SUCCESS(res.data.data);
        window.location.href = "/user-panel";
        Cookies.set("token", res.data.data?.accessToken);
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const signUpSlice = createSlice({
  name: "AuthSignUp",
  initialState: {
    data: {},
    loading: false,
    success: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(SingUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SingUp.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(SingUp.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default signUpSlice.reducer;
