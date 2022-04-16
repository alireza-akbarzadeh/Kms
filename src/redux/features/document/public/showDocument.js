import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showPublicDoc = createAsyncThunk(
    "getPublicDocument/Documents",
    async ({id}, {rejectWithValue}) => {
        const res = await Http(`document/show/${id}`, {method: "get"})
        if (res.status === 200) {
            return {data: res?.data?.data};
        } else {
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showPublicDocSlice = createSlice({
    name: "getPublicDocument",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showPublicDoc.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(showPublicDoc.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(showPublicDoc.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default showPublicDocSlice.reducer;
