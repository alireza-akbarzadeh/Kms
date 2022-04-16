import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const AddCategory = createAsyncThunk(
        "AddCategory/Categories",
        async ({data, method = "post", id}, {rejectWithValue}) => {
            let url = null;
            if (method === "put") {
                url = `document/category/${id}`
            } else {
                url = `document/category`
            }
            const res = await Http(url, {method: method, data})
            if (res.status === 200) {
                return {data: res.data?.data};
            } else {
                Alert.ERROR(res.response.data.message)
                return rejectWithValue(res.response.data.errors)
            }
        }
    )
;

const AddCategorySlice = createSlice({
    name: "AddCategory",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(AddCategory.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default AddCategorySlice.reducer;
