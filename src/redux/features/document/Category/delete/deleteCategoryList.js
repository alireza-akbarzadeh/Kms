import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const getDeletedCategoryList = createAsyncThunk(
    "getDeletedCategoryList/CategoryList",
    async ({}, {rejectWithValue}) => {
        const res = await Http(`document/category/deleted/index`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const getDeletedCategoryListSlice = createSlice({
    name: "getDeletedCategoryList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDeletedCategoryList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDeletedCategoryList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getDeletedCategoryList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});
export default getDeletedCategoryListSlice.reducer;
