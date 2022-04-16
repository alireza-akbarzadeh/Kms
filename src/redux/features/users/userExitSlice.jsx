import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

// ********************* USER Exit FUNCTIONALITY*********************

export const userExitTime = createAsyncThunk(
  "UserExit/UserStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http("user/setTime/out", {
        withCredentials: true,
        method: "get",
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        // window.location.href = "/dashboard";
      } else {
        return Alert.WARNING(res?.response?.data?.error);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const initialState = {
  errors: {},
  loading: false,
};
const userExitSlice = createSlice({
  name: "UserExit",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(userExitTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(userExitTime.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userExitTime.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default userExitSlice.reducer;
