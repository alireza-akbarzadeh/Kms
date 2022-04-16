import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "helper";

export const DeleteMember = createAsyncThunk(
    "DeleteTeamMemberRole/Teams",
    async ({data}) => {
        const res = await Http(`team/member`, {
            method: "delete",
            data
        });
        if (res.status === 200) {
            return {data: true};
        }
    }
);

const DeleteMemberSlice = createSlice({
    name: "UpdateTeamMemberRole",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(DeleteMember.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteMember.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(DeleteMember.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default DeleteMemberSlice.reducer;
