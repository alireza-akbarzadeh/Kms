import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showCategoryList = createAsyncThunk(
    "ShowCategoryList/ShowCategory",
    async (id, {rejectWithValue}) => {
        const res = await Http(`document/category/${id}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showCategoryListSlice = createSlice({
    name: "ShowCategoryList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showCategoryList.pending, (state) => {
                state.loading = true;
            })
            .addCase(showCategoryList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showCategoryList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showCategoryListSlice.reducer;
