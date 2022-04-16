import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";
export const getUserInfo = createAsyncThunk("GetUserInfo/user", async () => {
  const res = await Http("user/profile", { method: "get" });
  if (res.status === 200) {
    return { data: res.data };
  }
});
const userSlice = createSlice({
  name: "GetUserInfo",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default userSlice.reducer;
