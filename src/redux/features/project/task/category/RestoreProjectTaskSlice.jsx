import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const restoreProjectTasks = createAsyncThunk("RestoreProjectTasks/Task", async (id, {rejectWithValue}) => {
    const res = await Http(`task/category/restore/${id}`, {method: "get"})
    if (res.status === 200) {
        Alert.SUCCESS(res.data.data)
        return {data: res.data?.data};
    } else {
        Alert.ERROR(res.response.data.message)
        return rejectWithValue(res.response.data.errors)
    }
});

const restoreProjectTasksSlice = createSlice({
    name: "RestoreProjectTasks", initialState: {
        data: {}, loading: false, error: {},
    }, reducers: {}, extraReducers: (b) => b
        .addCase(restoreProjectTasks.pending, (state) => {
            state.loading = true;
        })
        .addCase(restoreProjectTasks.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        })
        .addCase(restoreProjectTasks.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        }),
});

export default restoreProjectTasksSlice.reducer;
