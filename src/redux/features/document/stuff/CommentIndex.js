import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const CommentIndex = createAsyncThunk(
    "CommentIndex/Comments",
    async ({id, page, perPage}, {rejectWithValue}) => {
        const res = await Http(`document/comments/${id}?page=${page}&perPage=${perPage}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const CommentIndexSlice = createSlice({
    name: "CommentIndex",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(CommentIndex.pending, (state) => {
                state.loading = true;
            })
            .addCase(CommentIndex.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(CommentIndex.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default CommentIndexSlice.reducer;
