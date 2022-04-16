import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const DocumentChangeStatus = createAsyncThunk(
    "DocumentChangeStatus/Documents",
    async ({id, type, comment}, {rejectWithValue}) => {
        const res = await Http(`document/status/${type}/${id}?comment=${comment}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const DocumentChangeStatusSlice = createSlice({
    name: "DocumentChangeStatus",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(DocumentChangeStatus.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(DocumentChangeStatus.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(DocumentChangeStatus.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default DocumentChangeStatusSlice.reducer;
