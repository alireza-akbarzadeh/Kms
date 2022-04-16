import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Check UNIQ  FUNCTIONALITY*********************
export const CheckEmailUser = createAsyncThunk(
  "CheckUniqEmail/checkEmail",
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

export const checkUniqEmailSlice = createSlice({
  name: "CheckUniqEmail",
  initialState: {
    data: {},
    loading: false,
    check: null,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(CheckEmailUser.pending, (state, action) => {
        state.loading = true;
        state.check = false;
      })
      .addCase(CheckEmailUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.check = true;
      })
      .addCase(CheckEmailUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.check = false;
        state.errors = action.payload;
      }),
});

export default checkUniqEmailSlice.reducer;
