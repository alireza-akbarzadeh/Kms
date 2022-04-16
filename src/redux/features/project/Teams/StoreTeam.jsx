import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const StoreTeam = createAsyncThunk(
    "StoreTeam/Teams",
    async ({data}, { rejectWithValue }) => {
        try {
            const res = await Http(`team/crud`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const StoreTeamSlice = createSlice({
    name: "StoreTeam",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(StoreTeam.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(StoreTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(StoreTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default StoreTeamSlice.reducer;
