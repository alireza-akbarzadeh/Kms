import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const AddMember = createAsyncThunk(
    "AddMemberRole/Teams",
    async ({data}, {rejectWithValue})  => {
        const res = await Http(`team/member`, {
            method: "post",
            data
        });
        if (res.status === 200) {
            return {data: true};
        }else{
            return rejectWithValue(res.response.data.error)
        }
    }
);

const AddMemberSlice = createSlice({
    name: "AddMemberRole",
    initialState: {
        data: {},
        loading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(AddMember.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(AddMember.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(AddMember.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default AddMemberSlice.reducer;
