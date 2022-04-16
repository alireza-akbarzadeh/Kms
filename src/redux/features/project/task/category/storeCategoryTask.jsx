import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const storeCategoryTask = createAsyncThunk(
    "storeCategoryTask/storeCategory",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`task/category`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data);
                return {
                    data: res.data,
                };
            } else {
                Alert.ERROR(res.data.error);
                return {
                    data: rejectWithValue(res.response.data.errors)
                };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const storeCategoryTaskSlice = createSlice({
    name: "storeCategoryTask",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeCategoryTask.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeCategoryTask.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeCategoryTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeCategoryTaskSlice.reducer;
