import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";
import {Params} from "helper";

export const RestoreMainWiki = createAsyncThunk(
    "RestoreMainWiki/Contributes",
    async ({id}, {rejectWithValue}) => {
        const res = await Http(`document/wiki/contribute/restore/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const RestoreMainWikiSlice = createSlice({
    name: "RestoreMainWiki",
    initialState: {
        data: {},
        loading: false,
        isSuccess: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(RestoreMainWiki.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(RestoreMainWiki.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(RestoreMainWiki.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default RestoreMainWikiSlice.reducer;
