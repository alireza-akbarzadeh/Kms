import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError, Http } from "helper";
import Cookies from "js-cookie";

// ********************* USER SING UP  FUNCTIONALITY*********************
export const SingOut = createAsyncThunk(
  "AuthSignOut/singOutUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http("user/logout", { method: "get" });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        Cookies.remove("token");
        window.location.href = "/";
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

const singOutSlice = createSlice({
  name: "AuthSignOut",
  initialState: {
    data: {},
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(SingOut.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SingOut.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(SingOut.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default singOutSlice.reducer;
