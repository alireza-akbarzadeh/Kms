import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Http } from "helper/Http";


export const showDriveList = createAsyncThunk(
    "ShowDriveList/DriveList",
    async (id) => {
        const res = await Http(`document/drive/${id}`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const showDriveListSlice = createSlice({
    name: "ShowDriveList",
    initialState: {
        loading: false,
        error: {},
        data: [],
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showDriveList.pending, (state) => {
                state.loading = true;
            })
            .addCase(showDriveList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action?.payload?.data;
            })
            .addCase(showDriveList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showDriveListSlice.reducer;
