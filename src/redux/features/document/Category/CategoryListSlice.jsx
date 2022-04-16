import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const categoryList = createAsyncThunk(
    "categoryList/categories",
    async ({withDoc = false}, {rejectWithValue}) => {
        const res = await Http(`document/category?withDoc=${withDoc}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const categoryListSlice = createSlice({
    name: "categoryList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(categoryList.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(categoryList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default categoryListSlice.reducer;
