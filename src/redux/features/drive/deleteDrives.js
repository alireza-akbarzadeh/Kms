import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Http } from "helper/Http";

export const deleteDriveList = createAsyncThunk(
  "MyDriveList/List",
  async ({ id }) => {
    const res = await Http(`document/drive/${id}`, {
      method: "delete",
    });
    if (res.status === 200) {
      return {
        data: res.data.data,
      };
    }
  }
);

export const deleteDriveListSlice = createSlice({
  name: "MyDriveList",
  initialState: {
    loading: false,
    error: {},
    isSuccess: null,
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(deleteDriveList.pending, (state) => {
        state.loading = true;
        state.isSuccess = null;
      })
      .addCase(deleteDriveList.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteDriveList.rejected, (state, action) => {
        state.isSuccess = false;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default deleteDriveListSlice.reducer;
