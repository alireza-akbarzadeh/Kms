import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";
// ********************* USER Add Rules  FUNCTIONALITY*********************

export const gteDetailsRulesList = createAsyncThunk(
    "detailsRules/details",
    async (id) => {
        const res = await Http(`customer/config/rule/${id}`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const detailsRulesSlice = createSlice({
    name: "AllRulesList",
    initialState: {
        loading: false,
        error: {},
        data: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(gteDetailsRulesList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(gteDetailsRulesList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data
            })
            .addCase(gteDetailsRulesList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default detailsRulesSlice.reducer;
