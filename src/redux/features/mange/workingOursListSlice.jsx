import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const getUserWorkingOursList = createAsyncThunk(
    "workingOursListSlice/workingOurs",
    async () => {
        const res = await Http(`user/hr/logIndex/arrival/index`, {
            method: "get",
        });
        if (res.status === 200) {
            Alert.SUCCESS(res?.data?.data);
            return {data: res.data?.data};
        }
    }
);

const workingOursListSlice = createSlice({
    name: "StatusWorkingOurs",
    initialState: {
        loading: false,
        error: {},
        data: [],
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getUserWorkingOursList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserWorkingOursList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getUserWorkingOursList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default workingOursListSlice.reducer;
