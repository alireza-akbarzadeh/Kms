import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const makePublicDoc = createAsyncThunk(
    "MakePublicDoc/Documents",
    async ({id}, {rejectWithValue}) => {
        const res = await Http(`document/makePublic/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const makePublicDocSlice = createSlice({
    name: "MakePublicDoc",
    initialState: {
        data: {},
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(makePublicDoc.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(makePublicDoc.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(makePublicDoc.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default makePublicDocSlice.reducer;
