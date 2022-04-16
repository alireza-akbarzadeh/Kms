import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http, Params} from "helper";

export const IndexDocument = createAsyncThunk(
    "IndexDocument/Documents",
    async ({page = 1, perPage = 10, filters = null, search = null}, {rejectWithValue}) => {
        const url = Params(`document`, {page, perPage, filters, search})
        const res = await Http(url, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const IndexDocumentSlice = createSlice({
    name: "IndexDocument",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(IndexDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(IndexDocument.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(IndexDocument.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default IndexDocumentSlice.reducer;
