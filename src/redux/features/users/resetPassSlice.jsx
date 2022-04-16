import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

// ********************* USER Reset PassWord  FUNCTIONALITY*********************

export const restPassAction = createAsyncThunk(
  "ResetPassword/restPass",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http("user/resetPassword", { method: "post", data });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.data);
        return {
          data: res.data,
        };
      } else {
        return rejectWithValue(res?.response?.data.errors);
      }
    } catch (error) {
      Alert.ERROR(error?.response?.data?.error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const initialState = {
  data: {},
  errors: {},
  loading: false,
  isSuccess: null,
};
const resetPasswordSlice = createSlice({
  name: "ResetPassword",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(restPassAction.pending, (state) => {
        state.loading = true;
       
      })
      .addCase(restPassAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(restPassAction.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.isSuccess = null;
        state.errors = action.payload;
      }),
});

export default resetPasswordSlice.reducer;
