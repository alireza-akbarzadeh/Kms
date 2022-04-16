import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const showProject = createAsyncThunk(
  "ShowProject/Project",
  async (id) => {
    const res = await Http(`project/${id}`, { method: "get" });
    if (res.status === 200) {
      return { data: res.data?.data };
    }
  }
);

const showPorjectSlice = createSlice({
  name: "ShowProject",
  initialState: {
    data: {},
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(showProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProject.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(showProject.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default showPorjectSlice.reducer;
