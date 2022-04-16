import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const statusWorkingOursAction = createAsyncThunk(
  "StatusWorkingOurs/StatusWorking",
  async ({ status, id }) => {
    const res = await Http(`user/hr/logIndex/${status}/${id}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const statusWorkingOursSlice = createSlice({
  name: "StatusWorkingOurs",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(statusWorkingOursAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(statusWorkingOursAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(statusWorkingOursAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default statusWorkingOursSlice.reducer;
