import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getUserMessagesList = createAsyncThunk(
  "GetUserMessagesList/GetUserMessages",
  async ({ seen, perPage, page }) => {
    const res = await Http(
      `user/messages?perPage=${perPage}&page=${page}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      return { data: res.data };
    }
  }
);

const getNotificationSlice = createSlice({
  name: "GetUserMessagesList",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserMessagesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserMessagesList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getUserMessagesList.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default getNotificationSlice.reducer;
