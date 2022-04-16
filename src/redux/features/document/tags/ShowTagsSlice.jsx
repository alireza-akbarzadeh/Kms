import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showTags = createAsyncThunk(
    "ShowTags/ShowTag",
    async (id, {rejectWithValue}) => {
        const res = await Http(`document/tag/${id}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showTagsSlice = createSlice({
    name: "ShowTags",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTags.pending, (state) => {
                state.loading = true;
            })
            .addCase(showTags.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showTags.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showTagsSlice.reducer;
