import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";

export const templateList = createAsyncThunk(
  "TemplateList/tickets",
  async () => {
    const res = await Http(`document/template`, {
      method: "get",
    });
    if (res.status === 200) {
      return {
        data: res.data.data,
      };
    }
  }
);

export const templateListSlice = createSlice({
  name: "TemplateList",
  initialState: {
    loading: false,
    error: {},
    data: null,
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(templateList.pending, (state) => {
        state.loading = true;
      })
      .addCase(templateList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(templateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default templateListSlice.reducer;
