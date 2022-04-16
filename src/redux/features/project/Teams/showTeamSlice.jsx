import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const showTeams = createAsyncThunk(
    "ShowTeamsSlice/Teams",
    async (id) => {
        const res = await Http(`team/crud/${id}`, { method: "get" });
        if (res.status === 200) {
            return { data: res.data?.data };
        }
    }
);

const showTeamsSlice = createSlice({
    name: "ShowTeamsSlice",
    initialState: {
        data: null,
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTeams.pending, (state) => {
                state.loading = true;
            })
            .addCase(showTeams.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showTeams.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showTeamsSlice.reducer;
