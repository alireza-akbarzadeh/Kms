import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";
// &search=${search}&sort=${DESC}&sortBy=${id}&type[]=${type},&type[]=${type}
// search, DESC, id, type

export const leaveRequestList = createAsyncThunk(
  "LeaveRequestListUser/leaveReq",
  async ({ perPage, page }) => {
    const res = await Http(
      `user/hr/leaveRequests?perPage=${perPage}&page=${page}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      return { data: res.data?.data };
    }
  }
);

const leaveRequestSlice = createSlice({
  name: "LeaveRequestListUser",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(leaveRequestList.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveRequestList.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(leaveRequestList.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default leaveRequestSlice.reducer;
