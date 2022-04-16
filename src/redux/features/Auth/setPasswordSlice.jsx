import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "helper";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Forgot Password FUNCTIONALITY*********************

export const setPassUser = createAsyncThunk(
  "SetForgotAuh/setForgotPass",
  async ({ slug, data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        ENDPOINT + `user/setPassword/${slug}`,
        data,
        {
          withCredentials: true,
        }
      );
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
const setPassSlice = createSlice({
  name: "SetForgotAuh",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(setPassUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPassUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(setPassUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default setPassSlice.reducer;
