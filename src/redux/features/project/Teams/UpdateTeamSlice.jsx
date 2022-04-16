import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const UpdateTeam = createAsyncThunk(
    "UpdateTeam/Teams",
    async ({id, data}) => {
        const res = await Http(`team/crud/${id}?_method=put`, {
            method: "post",
            data
        });
        if (res.status === 200) {
            Alert.SUCCESS(res?.data?.data)
            return {data: true};
        }
    }
);

const UpdateTeamSlice = createSlice({
    name: "UpdateTeam",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(UpdateTeam.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(UpdateTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(UpdateTeam.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default UpdateTeamSlice.reducer;
