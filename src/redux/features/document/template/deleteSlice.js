import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const deleteTemplate = createAsyncThunk(
  "deleteTemplate/template",
  async (id, { rejectWithValue }) => {
    const res = await Http(`document/template/${id}`, { method: "delete" });
    if (res.status === 200) {
      Alert.SUCCESS(res.data.message);

      return { data: res.data?.data };
    } else {
      Alert.ERROR(res.response.data.message);
      return rejectWithValue(res.response.data.errors);
    }
  }
);

const deleteTemplateSlice = createSlice({
  name: "TemplateList",
  initialState: {
    data: {},
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(deleteTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default deleteTemplateSlice.reducer;
