import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

// ********************* USER  Arrival Time FUNCTIONALITY*********************

export const userArrivalCalender = createAsyncThunk(
  "UserArrivalCalender/UserArrival",
  async (id, { rejectWithValue }) => {
    try {
      const res = await Http(`user/hr/logIndex/${id}`, {
        method: "get",
      });
      if (res.status === 200) {
        return { data: res?.data?.data };
      } else {
        return Alert.WARNING(res?.response?.data?.error);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const userArrivalCalenderSlice = createSlice({
  name: "UserArrivalCalender",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userArrivalCalender.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userArrivalCalender.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userArrivalCalender.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default userArrivalCalenderSlice.reducer;
