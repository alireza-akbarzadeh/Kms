import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";
// ********************* USER Add Rules  FUNCTIONALITY*********************

export const gteConfigLeaveList = createAsyncThunk(
    "configLeaveList/configLeave",
    async () => {
        const res = await Http(`customer/config/leaveRequest`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const configLeaveListSlice = createSlice({
    name: "AllRulesList",
    initialState: {
        loading: false,
        error: {},
        data: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(gteConfigLeaveList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(gteConfigLeaveList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data
            })
            .addCase(gteConfigLeaveList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default configLeaveListSlice.reducer;
