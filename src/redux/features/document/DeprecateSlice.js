import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const DeprecateDoc = createAsyncThunk(
    "DeprecateDoc/Documents",
    async ({id, type}, {rejectWithValue}) => {
        const res = await Http(`document/${type}/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const DeprecateDocSlice = createSlice({
    name: "DeprecateDoc",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(DeprecateDoc.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(DeprecateDoc.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(DeprecateDoc.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default DeprecateDocSlice.reducer;
