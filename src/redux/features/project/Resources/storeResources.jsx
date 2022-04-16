import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, getError} from "helper";
import {Http} from "helper/Http";


export const storeResources = createAsyncThunk(
    "StoreResource/Resource",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`project/doc/store`, {
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

export const storeResourcesSlice = createSlice({
    name: "StoreResource",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeResources.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeResources.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeResources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeResourcesSlice.reducer;
