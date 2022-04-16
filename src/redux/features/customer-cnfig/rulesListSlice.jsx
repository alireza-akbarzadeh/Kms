import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";
// ********************* USER Add Rules  FUNCTIONALITY*********************

export const gteRulesList = createAsyncThunk(
  "AllRulesList/AllRules",
  async () => {
    const res = await Http(`customer/config/rule`, {
      method: "get",
    });
    if (res.status === 200) {
      return {
        data: res.data.data,
      };
    }
  }
);

export const rulesListSlice = createSlice({
  name: "AllRulesList",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(gteRulesList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(gteRulesList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(gteRulesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default rulesListSlice.reducer;
