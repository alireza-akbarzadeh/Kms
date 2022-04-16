import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* USER Add Rules  FUNCTIONALITY*********************

export const deleteRuleList = createAsyncThunk(
  "DeleteRules/Rules",
  async (id) => {
    const res = await Http(`customer/config/rule/${id}`, {
      method: "delete",
    });
    if (res.status === 200) {
      Alert.SUCCESS(res.data.message);
      return {
        data: res.data,
      };
    }
  }
);

export const DeleteRulesSlice = createSlice({
  name: "DeleteRules",
  initialState: {
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(deleteRuleList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteRuleList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteRuleList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default DeleteRulesSlice.reducer;
