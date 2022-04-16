import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* customer Update leave  FUNCTIONALITY*********************
export const updateConfigLeave = createAsyncThunk(
    "UpdateRulesCustomer/UpdateRules",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`customer/config/leaveRequest`, {
                method: "put",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                };
            } else {
                return rejectWithValue(res?.response?.data.errors);
            }
        } catch (error) {
            Alert.ERROR(error?.response?.data.errors);
            return rejectWithValue(error?.response?.data.errors);
        }
    }
);

export const updateConfigLeaveSlice = createSlice({
    name: "UpdateRulesCustomer",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateConfigLeave.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateConfigLeave.fulfilled, (state) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateConfigLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default updateConfigLeaveSlice.reducer;
