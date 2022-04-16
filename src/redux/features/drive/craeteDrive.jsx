import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, getError} from "helper";
import {Http} from "helper/Http";

// ********************* create Drive   FUNCTIONALITY*********************

export const createDrive = createAsyncThunk(
    "AddRulesCustomer/AddRules",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http(`document/drive`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const createDriveSlice = createSlice({
    name: "AddRulesCustomer",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(createDrive.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(createDrive.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(createDrive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default createDriveSlice.reducer;
