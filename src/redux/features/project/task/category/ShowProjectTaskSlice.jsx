import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showProjectTasks = createAsyncThunk(
    "ShowProjectTasks/Task",
    async ({id, archive}, {rejectWithValue}) => {
        const res = await Http(`task/category/${id}?archive=${archive}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showProjectTasksSlice = createSlice({
    name: "ShowProjectTasks",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showProjectTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(showProjectTasks.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showProjectTasks.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showProjectTasksSlice.reducer;
