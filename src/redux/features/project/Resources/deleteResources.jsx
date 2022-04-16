import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "helper";

export const deleteResources = createAsyncThunk(
    "DeleteResources/Resources",
    async ({id, data}) => {
        const res = await Http(`project/doc/remove/${id}`, {method: "delete", data});
        if (res.status === 200) {
            return {data: res.data?.data};
        }
    }
);

const deleteResourcesListSlice = createSlice({
    name: "DeleteResources",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteResources.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteResources.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteResources.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default deleteResourcesListSlice.reducer;
