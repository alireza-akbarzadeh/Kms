import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";
// &search=${search}&sort=${DESC}&sortBy=${id}&type[]=${type},&type[]=${type}
// search, DESC, id, type

export const leaveRequestDetailsList = createAsyncThunk(
  "LeaveRequestDetails/leaveReqDetail",
  async ({ id, perPage, page }) => {
    const res = await Http(
      `user/hr/leaveRequests/${id}?perPage=${perPage}&page=${page}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      return { data: res.data?.data };
    }
  }
);

const LeaveRequsetDetailstSlice = createSlice({
  name: "LeaveRequestDetails",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(leaveRequestDetailsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveRequestDetailsList.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(leaveRequestDetailsList.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default LeaveRequsetDetailstSlice.reducer;
