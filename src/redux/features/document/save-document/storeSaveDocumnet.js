import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const storeSaveDocument = createAsyncThunk(
    "StoreSaveDocument/StoreTag",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`/document/saved/store`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                return {
                    data: res.data,
                };
            } else {
                Alert.ERROR(res.response.data.error);
                return {
                    data: rejectWithValue(res.response.data.errors)
                };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const storeSaveDocumentSlice = createSlice({
    name: "StoreSaveDocument",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeSaveDocument.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeSaveDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeSaveDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default storeSaveDocumentSlice.reducer;
