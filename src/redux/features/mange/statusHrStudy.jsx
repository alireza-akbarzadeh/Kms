import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const statusHrStudyAction = createAsyncThunk(
  "StatusHrStudy/StatusHr",
  async ({ status, id }) => {
    const res = await Http(`user/hr/logIndex/studyTime/${status}/${id}`, {
      method: "get",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res?.data?.data);
      return { data: res.data?.data };
    }
  }
);

const statusHrStudySice = createSlice({
  name: "StatusHrStudy",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(statusHrStudyAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(statusHrStudyAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(statusHrStudyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default statusHrStudySice.reducer;
