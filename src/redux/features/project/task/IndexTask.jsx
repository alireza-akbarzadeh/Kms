import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const IndexTask = createAsyncThunk(
    "IndexTask/tasks",
    async ({isPaginate = false},  { rejectWithValue }) => {
        try {
            const res = await Http(`task?isPaginate=${isPaginate}`, {
                method: "get"
            });
            if (res.status === 200) {
                return {data: res?.data?.data?.data};
            } else {
                Alert.SUCCESS(res.data.errors);
                return {
                    data: rejectWithValue(res.response.data.error)
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const IndexTaskSlice = createSlice({
    name: "IndexTask",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null,
        data: {}
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(IndexTask.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(IndexTask.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(IndexTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default IndexTaskSlice.reducer;
