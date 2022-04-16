import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const updateUserArrivalTimes = createAsyncThunk(
  "updateUserArrivalTimes/updateUserArrival",
  async (data) => {
    const res = await Http(`user/updateArrivalTime`, {
      method: "put",
      data,
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    } else {
      Alert.ERROR(res?.data?.data);
    }
  }
);

const updateUserTimesSlice = createSlice({
  name: "updateUserArrivalTimes",
  initialState: {
    loading: false,
    error: {},
    isSuccess: null,

  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(updateUserArrivalTimes.pending, (state) => {
        state.loading = true;
          state.isSuccess = null;
      })
      .addCase(updateUserArrivalTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserArrivalTimes.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      }),
});

export default updateUserTimesSlice.reducer;
