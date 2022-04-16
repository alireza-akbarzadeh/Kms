import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const userAcceptLeave = createAsyncThunk(
  "UserAcceptLeave/acceptLeave",
  async ({ id, status }) => {
    const res = await Http(`user/hr/logIndex/accept/${id}?status=${status}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const userAcceptVacationSlice = createSlice({
  name: "UserAcceptLeave",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userAcceptLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAcceptLeave.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userAcceptLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default userAcceptVacationSlice.reducer;
