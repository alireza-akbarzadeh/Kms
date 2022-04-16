import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getListChangeTime = createAsyncThunk(
  "changeTimeWorkList/changeTime",
  async () => {
    const res = await Http(`user/hr/leaveRequests`, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data?.data };
    }
  }
);

const changeTimeWorkListSlice = createSlice({
  name: "changeTimeWorkList",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getListChangeTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListChangeTime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getListChangeTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default changeTimeWorkListSlice.reducer;
