import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* Get Details Drive  FUNCTIONALITY*********************

export const getDetailsDrive = createAsyncThunk(
    "GetDetailsDrive/getDetails",
    async (id) => {
        const res = await Http(`document/drive/${id}`, {
            method: "post",
        });
        if (res.status === 200) {
            Alert.SUCCESS(res.data.message);
            return {
                data: res.data,
            };
        }
    }
);

export const getDetailsDriveSlice = createSlice({
    name: "GetDetailsDrive",
    initialState: {
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDetailsDrive.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDetailsDrive.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getDetailsDrive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getDetailsDriveSlice.reducer;
