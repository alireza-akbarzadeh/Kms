import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getUserMessages = createAsyncThunk(
  "GetUserMessages/userMessage",
  async ({ seen, perPage, page }) => {
    const res = await Http(
      `user/messages?seen=${seen}&perPage=${perPage}&page=${page}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      return { data: res.data };
    }
  }
);

const NotificationSlice = createSlice({
  name: "GetUserMessages",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getUserMessages.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default NotificationSlice.reducer;
