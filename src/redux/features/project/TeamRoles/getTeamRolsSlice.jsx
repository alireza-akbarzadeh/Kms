import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getTeamRoles = createAsyncThunk(
    "getTeamRoles/GetTeams",
    async () => {
        const res = await Http(
            `teamRole`,
            { method: "get" }
        );
        if (res.status === 200) {
            return { data: res.data?.data };
        }
    }
);

const TeamRolesListSlice = createSlice({
    name: "getTeamRoles",
    initialState: {
        data: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTeamRoles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTeamRoles.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
            })
            .addCase(getTeamRoles.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default TeamRolesListSlice.reducer;
