import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const ContributeChangeStatus = createAsyncThunk(
    "ContributeChangeStatus/Documents",
    async ({id, type, comment}, {rejectWithValue}) => {
        const res = await Http(`document/wiki/contribute/${type}/${id}`, {method: "put"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const ContributeChangeStatusSlice = createSlice({
    name: "ContributeChangeStatus",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(ContributeChangeStatus.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(ContributeChangeStatus.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(ContributeChangeStatus.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default ContributeChangeStatusSlice.reducer;
