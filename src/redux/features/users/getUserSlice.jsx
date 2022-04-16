import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getUserList = createAsyncThunk(
  "GetUserList/userList",
  async ({ perPage, page }) => {
    const res = await Http(
      `user/customerIndex?perPage=${perPage}&page=${page}`,
      { method: "get" }
    );
    if (res.status === 200) {
      return { data: res.data };
    }
  }
);

export const findUser = createAsyncThunk(
  "GetUserList/finduser",
  async (search) => {
    const res = await Http(`user/customerIndex?&search=${search}`, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data };
    }
  }
);

const userListSlice = createSlice({
  name: "GetUserList",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default userListSlice.reducer;
