import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http, Alert } from "helper";

export const getUserVacation = createAsyncThunk(
  "UserVacation/MYVacation",
  async ({ perPage, page }) => {
    const res = await Http(
      `user/logIndex/leave?perPage=${perPage}&page=${page}`,
      { method: "get" }
    );
    if (res.status === 200) {
      Alert.SUCCESS(res.data.data);
      return { data: res.data.data };
    }
  }
);
const VacationSlice = createSlice({
  name: "UserVacation",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserVacation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserVacation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getUserVacation.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default VacationSlice.reducer;
