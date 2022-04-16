import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {getError } from "../../../helper";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Check Type  FUNCTIONALITY*********************
export const getCustomerTypes = createAsyncThunk(
  "customerTypes/customer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(ENDPOINT + "user/customerTypes", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        // Alert.SUCCESS(res.data.message);
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const customerTypesSlice = createSlice({
  name: "customerTypes",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getCustomerTypes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCustomerTypes.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getCustomerTypes.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default customerTypesSlice.reducer;
