import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Check UNIQ  FUNCTIONALITY*********************
export const CheckUserInfo = createAsyncThunk(
  "CheckUserAuth/checkUser",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(ENDPOINT + "user/checkUnique", data, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return {
        data: res.data,
      };
    }
  }
);

export const checkUserSlice = createSlice({
  name: "CheckUserAuth",
  initialState: {
    data: {},
    loading: false,
    check: null,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(CheckUserInfo.pending, (state, action) => {
        state.loading = true;
        state.check = false;
      })
      .addCase(CheckUserInfo.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.check = true;
      })
      .addCase(CheckUserInfo.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.check = false;
        state.errors = action.payload;
      }),
});

export default checkUserSlice.reducer;
