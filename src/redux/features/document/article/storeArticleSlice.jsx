import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const storeArticle = createAsyncThunk(
    "StoreArticle/StoreTag",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`/document`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message)
                return {
                    data: res.data,
                    isOk: true
                };
            } else {
                Alert.ERROR(res.response.data.error);
                return {
                    data: rejectWithValue(res.response.data.errors),
                    isOk: false
                };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const storeArticleSlice = createSlice({
    name: "StoreArticle",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeArticle.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = action?.payload?.isOk;
                state.data = action?.payload?.data
            })
            .addCase(storeArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeArticleSlice.reducer;
