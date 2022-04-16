import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const SetReadTime = createAsyncThunk(
    "SetReadTime/likeStuff",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`/document/setReadTime`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data)
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

export const SetReadTimeSlice = createSlice({
    name: "SetReadTime",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(SetReadTime.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(SetReadTime.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(SetReadTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default SetReadTimeSlice.reducer;
