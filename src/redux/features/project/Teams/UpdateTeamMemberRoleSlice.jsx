import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "helper";

export const UpdateTeamMemberRole = createAsyncThunk(
    "UpdateTeamMemberRole/Teams",
    async ({data}) => {
        const res = await Http(`team/member`, {
            method: "put",
            data
        });
        if (res.status === 200) {
            return {data: true};
        }
    }
);

const UpdateTeamMemberRoleSlice = createSlice({
    name: "UpdateTeamMemberRole",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(UpdateTeamMemberRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateTeamMemberRole.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(UpdateTeamMemberRole.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default UpdateTeamMemberRoleSlice.reducer;
