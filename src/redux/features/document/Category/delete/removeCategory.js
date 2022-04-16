import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const removeCategoryList = createAsyncThunk(
    "RemoveCategoryList/Remove",
    async ({id, data}, {rejectWithValue}) => {
        const res = await Http(`document/category/${id}`, {method: "delete", data})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data);
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.error)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const removeCategoryListSlice = createSlice({
    name: "RemoveCategoryList",
    initialState: {
        data: {},
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(removeCategoryList.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(removeCategoryList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;

            })
            .addCase(removeCategoryList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default removeCategoryListSlice.reducer;
