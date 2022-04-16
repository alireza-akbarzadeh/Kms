import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http, Params} from "helper";


export const IndexContribute = createAsyncThunk(
    "IndexContribute/Contributes",
    async ({id, page = 1, perPage = 15, show = false, filters, search}, {rejectWithValue}) => {
        const url = !show ? Params(`document/wiki/contribute/${id}`, {page, perPage, filters, search}) : Params(`document/wiki/contribute/show/${id}`)
        const res = await Http(url, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const IndexContributeSlice = createSlice({
    name: "IndexContribute",
    initialState: {
        data: {},
        loading: false,
        isSuccess: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(IndexContribute.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(IndexContribute.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(IndexContribute.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default IndexContributeSlice.reducer;
