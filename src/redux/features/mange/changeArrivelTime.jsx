import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const changeArrivalTime = createAsyncThunk(
  "ChangeArrivalTime/ChangeArrival",
  async (data) => {
    const res = await Http(`user/hr/logIndex/arrival`, {
      method: "post",
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

const ChangeArrivalTimeSlice = createSlice({
  name: "ChangeArrivalTime",
  initialState: {
    loading: false,
    error: {},
      isSuccess: null
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(changeArrivalTime.pending, (state) => {
        state.loading = true;
        state.isSuccess = null;
      })
      .addCase(changeArrivalTime.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(changeArrivalTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      }),
});

export default ChangeArrivalTimeSlice.reducer;
