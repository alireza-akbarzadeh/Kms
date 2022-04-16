import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "helper";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Forgot Password FUNCTIONALITY*********************

export const forgotPassUser = createAsyncThunk(
  "ForgotAuh/forgotPass",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(ENDPOINT + `user/forgotPassword/${data}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.data);
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
const forgotPassSlice = createSlice({
  name: "ForgotAuh",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(forgotPassUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(forgotPassUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default forgotPassSlice.reducer;
