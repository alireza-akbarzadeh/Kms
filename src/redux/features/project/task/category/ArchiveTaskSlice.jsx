import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const archiveProjectTasks = createAsyncThunk(
    "ArchiveProjectTasks/Archive",
    async (id, {rejectWithValue}) => {
        const res = await Http(`task/category/archive/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.error)
            return rejectWithValue(res.response.data.error)
        }
    }
);

const archiveProjectTasksSlice = createSlice({
    name: "ArchiveProjectTasks",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(archiveProjectTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(archiveProjectTasks.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(archiveProjectTasks.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default archiveProjectTasksSlice.reducer;
