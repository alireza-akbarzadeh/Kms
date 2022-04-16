import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const UpdateTask = createAsyncThunk(
    "UpdateTask/tasks",
    async ({id, data}, { rejectWithValue }) => {
        try {
            const res = await Http(`task/${id}`, {
                method: "put",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data);
                return {
                    data: res.data,
                };
            } else {
                Alert.SUCCESS(res.data.errors);
                return {
                    data: rejectWithValue(res.data,)
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const UpdateTaskSlice = createSlice({
    name: "StoreTask",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(UpdateTask.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(UpdateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(UpdateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default UpdateTaskSlice.reducer;
