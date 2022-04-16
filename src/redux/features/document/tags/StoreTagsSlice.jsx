import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const storeTags = createAsyncThunk(
    "StoreTags/StoreTag",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`/document/tag`, {
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

export const storeTagsSlice = createSlice({
    name: "StoreTags",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeTags.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeTags.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeTagsSlice.reducer;
