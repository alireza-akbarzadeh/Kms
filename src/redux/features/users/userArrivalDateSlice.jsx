import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

// ********************* USER  Arrival Time FUNCTIONALITY*********************
export const userArrivalDte = createAsyncThunk(
    "ChangeArrivalTime/ChangeArrival",
    async (data) => {
        const res = await Http(`user/logIndex`, {
            method: "get",
            data,
        });
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res?.data?.data);
        }
    }
);

const userArrivalDateSlice = createSlice({
    name: "UserArrivalDate",
    initialState: {
        loading: false,
        error: {},
        data: undefined,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(userArrivalDte.pending, (state) => {
                state.loading = true;
            })
            .addCase(userArrivalDte.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data
            })
            .addCase(userArrivalDte.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default userArrivalDateSlice.reducer;
