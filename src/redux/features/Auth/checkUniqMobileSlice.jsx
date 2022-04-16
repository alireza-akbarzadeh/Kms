import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Check UNIQ  FUNCTIONALITY*********************
export const checkUniqMobile = createAsyncThunk(
  "CheckUniqMobile/checkMobile",
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

export const checkUniqMobileSlice = createSlice({
  name: "CheckUniqMobile",
  initialState: {
    data: {},
    loading: false,
    check: null,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(checkUniqMobile.pending, (state, action) => {
        state.loading = true;
        state.check = false;
      })
      .addCase(checkUniqMobile.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.check = true;
      })
      .addCase(checkUniqMobile.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.check = false;
        state.errors = action.payload;
      }),
});

export default checkUniqMobileSlice.reducer;
