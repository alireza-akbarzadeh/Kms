import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";
// ********************* config Evaluate List  FUNCTIONALITY *********************

export const gteEvaluateList = createAsyncThunk(
    "ConfigEvaluateList/ConfigEvaluate",
    async () => {
        const res = await Http(`user/evaluate/config`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data,
            };
        }
    }
);
export const configEvaluateListSlice = createSlice({
    name: "ConfigEvaluateList",
    initialState: {
        loading: false,
        error: {},
        data: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(gteEvaluateList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(gteEvaluateList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data.data
            })
            .addCase(gteEvaluateList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default configEvaluateListSlice.reducer;
