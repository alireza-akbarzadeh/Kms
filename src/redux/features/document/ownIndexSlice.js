import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const ownIndexDocumnet = createAsyncThunk(
  "OwnIndexDocumnet/OwnIndex",
  async () => {
    const res = await Http(`document/index/own`, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data.data };
    } else {
      return res.response.data.error;
    }
  }
);

const ownIndexDocumnetSlice = createSlice({
  name: "OwnIndexDocumnet",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(ownIndexDocumnet.pending, (state) => {
        state.loading = true;
      })
      .addCase(ownIndexDocumnet.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(ownIndexDocumnet.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default ownIndexDocumnetSlice.reducer;
