import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const saveDocumentList = createAsyncThunk(
    "SaveDocumentList/DocumentList",
    async (type, {rejectWithValue}) => {
        const res = await Http(`document/saved/index?type=${type}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const saveDocumentListSlice = createSlice({
    name: "DeleteDocumentList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(saveDocumentList.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveDocumentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(saveDocumentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default saveDocumentListSlice.reducer;
