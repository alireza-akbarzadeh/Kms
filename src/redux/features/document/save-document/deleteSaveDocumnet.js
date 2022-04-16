import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const deleteDocumentList = createAsyncThunk(
    "DeleteDocumentList/DocumentList",
    async (id, {rejectWithValue}) => {
        const res = await Http(`document/saved/delete/${id}`, {method: "delete"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const deleteDocumentListSlice = createSlice({
    name: "DeleteDocumentList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteDocumentList.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDocumentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteDocumentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default deleteDocumentListSlice.reducer;
