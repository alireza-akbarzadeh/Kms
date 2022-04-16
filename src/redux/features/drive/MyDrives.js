import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Http } from "helper/Http";

export const myDriveList = createAsyncThunk("MyDriveList/List", async () => {
  const res = await Http("document/drive", {
    method: "get",
  });
  if (res.status === 200) {
    return {
      data: res.data.data,
    };
  }
});

export const myDriveListSlice = createSlice({
  name: "MyDriveList",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(myDriveList.pending, (state) => {
        state.loading = true;
      })
      .addCase(myDriveList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(myDriveList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default myDriveListSlice.reducer;
