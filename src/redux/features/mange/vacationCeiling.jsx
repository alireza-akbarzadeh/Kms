import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  Http } from "helper";

export const userVacationCeiling = createAsyncThunk(
  "UserVacationCeiling/vacationCeiling",
  async (id) => {
    const res = await Http(`user/hr/remainLeaveRequests/${id}`, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data?.data };
    }
  }
);

const userVacationCeilingSlice = createSlice({
  name: "UserVacationCeiling",
  initialState: {
    loading: false,
    error: {},
    data: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userVacationCeiling.pending, (state) => {
        state.loading = true;
      })
      .addCase(userVacationCeiling.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(userVacationCeiling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default userVacationCeilingSlice.reducer;
