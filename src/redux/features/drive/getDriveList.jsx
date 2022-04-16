import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {Http} from "helper/Http";


export const getDriveList = createAsyncThunk(
    "GetDriveList/DriveList",
    async ({type = null, isPaginate = false}) => {
        let url = `document/drive`;
        if (type !== null){
            url = `document/drive?type=${type}`
        }
        const res = await Http(url, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const getDriveListSlice = createSlice({
    name: "GetDriveList",
    initialState: {
        loading: false,
        error: {},
        data: [],
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDriveList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDriveList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action?.payload?.data;
            })
            .addCase(getDriveList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getDriveListSlice.reducer;
