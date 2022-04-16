import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const checkLeaveReq = createAsyncThunk(
  "CheckLeaveReq/checkLeave",
  async (id) => {
    const res = await Http(`user/hr/logIndex/arrival/user/${id}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const checkLeaveRequestSlice = createSlice({
  name: "CheckLeaveReq",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(checkLeaveReq.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLeaveReq.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(checkLeaveReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default checkLeaveRequestSlice.reducer;
