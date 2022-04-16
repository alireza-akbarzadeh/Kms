import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const recoverCategoryList = createAsyncThunk(
    "RecoverCategoryList/Recover",
    async (id, {rejectWithValue}) => {
        const res = await Http(`document/category/deleted/recover/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data?.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const recoverCategoryListSlice = createSlice({
    name: "RecoverCategoryList",
    initialState: {
        data: {},
        loading: false,
        isSuccess: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(recoverCategoryList.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(recoverCategoryList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(recoverCategoryList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default recoverCategoryListSlice.reducer;
