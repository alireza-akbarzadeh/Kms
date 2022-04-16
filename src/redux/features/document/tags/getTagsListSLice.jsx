import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const getTags = createAsyncThunk(
    "GetTags/tags",
    async ({id, isPaginate}, {rejectWithValue}) => {
        const res = await Http(`document/tag?isPaginate=${isPaginate}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const getTagsSlice = createSlice({
    name: "GetTags",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTags.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getTags.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getTagsSlice.reducer;
