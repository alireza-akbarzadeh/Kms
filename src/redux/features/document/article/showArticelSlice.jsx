import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showArticle = createAsyncThunk(
    "ShowArticle/Article",
    async ({id, page = 1, perPage = 5}, {rejectWithValue}) => {
        const res = await Http(`document/${id}?page=${page}&perPage=${perPage}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showArticleSlice = createSlice({
    name: "ShowArticle",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(showArticle.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showArticle.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showArticleSlice.reducer;
