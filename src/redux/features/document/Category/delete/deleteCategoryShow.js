import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const getDeletedCategoryShow = createAsyncThunk(
    "getDeletedCategoryShow/CategoryList",
    async (id,{rejectWithValue}) => {
        const res = await Http(`document/category/deleted/show/${id}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const getDeletedCategoryShowSlice = createSlice({
    name: "getDeletedCategoryShow",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDeletedCategoryShow.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDeletedCategoryShow.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getDeletedCategoryShow.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});
export default getDeletedCategoryShowSlice.reducer;
