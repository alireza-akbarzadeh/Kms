import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const userRejectLeave = createAsyncThunk(
  "RejectLeaveUser/rejectLeave",
  async ({ id, status }) => {
    const res = await Http(`/user/hr/logIndex/reject/${id}?status=${status}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const rejectVacationSlice = createSlice({
  name: "RejectLeaveUser",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userRejectLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRejectLeave.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userRejectLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default rejectVacationSlice.reducer;
