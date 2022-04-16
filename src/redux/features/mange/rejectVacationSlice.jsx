import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const rejectVacation = createAsyncThunk(
  "RejectVacationUser/vacationUser",
  async ({ id, status }) => {
    const res = await Http(`user/hr/leaveRequest/${id}/${status}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const rejectVacationSlice = createSlice({
  name: "RejectVacationUser",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(rejectVacation.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectVacation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(rejectVacation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default rejectVacationSlice.reducer;
