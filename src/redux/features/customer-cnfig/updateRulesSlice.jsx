import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* USER Update Rules  FUNCTIONALITY*********************
export const updateRuleList = createAsyncThunk(
  "UpdateRulesCustomer/UpdateRules",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await Http(`customer/config/rule/${id}`, {
        method: "put",
        data,
      });
      if (res.status === 200) {
        Alert.SUCCESS(res.data.message);
        return {
          data: res.data,
        };
      } else {
        return rejectWithValue(res?.response?.data.errors);
      }
    } catch (error) {
      Alert.ERROR(error?.response?.data.errors);
      return rejectWithValue(error?.response?.data.errors);
    }
  }
);

export const updateRulesSlice = createSlice({
  name: "UpdateRulesCustomer",
  initialState: {
    loading: false,
    isSuccess: null,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(updateRuleList.pending, (state) => {
        state.loading = true;
        state.isSuccess = null;
      })
      .addCase(updateRuleList.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateRuleList.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      }),
});

export default updateRulesSlice.reducer;
