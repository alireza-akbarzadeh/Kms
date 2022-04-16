import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "helper";

export const showResources = createAsyncThunk(
    "ShowResources/Resources",
    async (id) => {
        const res = await Http(`project/doc/index/${id}`, {method: "get"});
        if (res.status === 200) {
            return {data: res.data?.data};
        }
    }
);

const showResourcesListSlice = createSlice({
    name: "ShowResources",
    initialState: {
        data: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showResources.pending, (state) => {
                state.loading = true;
            })
            .addCase(showResources.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showResources.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showResourcesListSlice.reducer;
