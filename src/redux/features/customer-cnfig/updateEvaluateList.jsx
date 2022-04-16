import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";
import {Alert} from "helper";
// ********************* config Evaluate List  FUNCTIONALITY *********************

export const updateEvaluateList = createAsyncThunk(
    "UpdateEvaluateList/UpdateEvaluate",
    async (data) => {
        const res = await Http(`user/evaluate/config`, {
            method: "put",
            data
        });
        if (res.status === 200) {
            Alert.SUCCESS(res.data.message)
            return {
                data: res.data.data,
            };
        }
    }
);
export const updateEvaluateListSlice = createSlice({
    name: "UpdateEvaluateList",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateEvaluateList.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(updateEvaluateList.fulfilled, (state) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateEvaluateList.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default updateEvaluateListSlice.reducer;
