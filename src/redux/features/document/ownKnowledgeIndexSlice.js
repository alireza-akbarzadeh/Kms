import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const ownKnowledgeIndexDocument = createAsyncThunk(
  "OwnIndexDocument/OwnIndex",
  async () => {
    const res = await Http(`document/index/knowledge`, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data.data };
    } else {
      return res.response.data.error;
    }
  }
);

const ownKnowledgeIndexDocumentSlice = createSlice({
  name: "OwnIndexDocument",
  initialState: {
    data: [],
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(ownKnowledgeIndexDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(ownKnowledgeIndexDocument.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
        state.loading = false;
      })
      .addCase(ownKnowledgeIndexDocument.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      }),
});

export default ownKnowledgeIndexDocumentSlice.reducer;
