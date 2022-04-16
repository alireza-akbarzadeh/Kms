import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getUserArrival = createAsyncThunk(
  "GetArrivalDate/UserArrivalDate",
  async () => {
    const res = await Http(`user/logIndex`, { method: "get" });
    if (res.status === 200) {
      return { data: res.data };
    }
  }
);

const getUserArrivalDateSlice = createSlice({
  name: "GetArrivalDate",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserArrival.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserArrival.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(getUserArrival.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default getUserArrivalDateSlice.reducer;
