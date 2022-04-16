import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const CommentChangeStatus = createAsyncThunk(
    "CommentChangeStatus/Comments",
    async ({id, type}, {rejectWithValue}) => {
        const res = await Http(`document/comment/${type}/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const CommentChangeStatusSlice = createSlice({
    name: "CommentChangeStatus",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(CommentChangeStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(CommentChangeStatus.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(CommentChangeStatus.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default CommentChangeStatusSlice.reducer;
