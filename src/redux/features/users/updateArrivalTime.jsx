import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

export const updateArrivalTime = createAsyncThunk(
    "UpdateArrivalTime/UpdateArrival",
    async (data) => {
        const res = await Http(`user/hr/logIndex/arrival`, {
            method: "post",
            data,
        });
        if (res.status === 200) {
            Alert.SUCCESS(res?.data?.data);
            return { data: res.data?.data };
        } else {
            Alert.ERROR(res?.data?.data);
        }
    }
);

const updateArrivalTimeSlice = createSlice({
    name: "ChangeArrivalTime",
    initialState: {
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateArrivalTime.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateArrivalTime.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateArrivalTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default updateArrivalTimeSlice.reducer;
