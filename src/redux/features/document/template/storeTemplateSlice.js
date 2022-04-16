import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

export const storeTemplate = createAsyncThunk(
  "storeTemplate/store",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http(`document/template`, {
        method: "post",
        data,
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        return {
          data: res.data,
        };
      } else {
        Alert.ERROR(res.data.errors);
        return {
          data: rejectWithValue(res.response.data.errors),
        };
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const storeTemplateSlice = createSlice({
  name: "storeTemplate",
  initialState: {
    loading: false,
    error: {},
    isSuccess: null,
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(storeTemplate.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = null;
      })
      .addCase(storeTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(storeTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      }),
});

export default storeTemplateSlice.reducer;
