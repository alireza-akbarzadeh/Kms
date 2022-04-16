import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, getError, Http } from "helper";

// ********************* USER  Arrival Time FUNCTIONALITY*********************

export const userArrivalTime = createAsyncThunk(
  "SetArrivalTime/ArrivalTime",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http("user/setTime/arrival", {
        withCredentials: true,
        method: "get",
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        // window.location.href = "/dashboard";
      } else {
        return Alert.WARNING(res?.response?.data?.error);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const setArrivalTimeSlice = createSlice({
  name: "SetArrivalTime",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userArrivalTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(userArrivalTime.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userArrivalTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default setArrivalTimeSlice.reducer;
