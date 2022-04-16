import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";

// ********************* USER Add Rules  FUNCTIONALITY*********************

export const updateDrive = createAsyncThunk(
    "UpdateDriveS/drive",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Http(`document/drive/${id}`, {
                method: "put",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data.data,
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const updateDriveSlice = createSlice({
    name: "UpdateDriveS",
    initialState: {
        loading: false,
        error: {},
        isSucess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateDrive.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null
            })
            .addCase(updateDrive.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true
            })
            .addCase(updateDrive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false
            }),
});

export default updateDriveSlice.reducer;
