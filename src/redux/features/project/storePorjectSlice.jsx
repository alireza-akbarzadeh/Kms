import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const storeProject = createAsyncThunk(
    "StoreProject/project",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`project`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
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

export const storeProjectSlice = createSlice({
    name: "StoreProject",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeProject.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeProject.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeProjectSlice.reducer;
