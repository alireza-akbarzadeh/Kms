import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* create Team   FUNCTIONALITY*********************

export const userSubmitSickLaeve = createAsyncThunk(
    "UserSubmitSickLaeve/UserSubmit",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`user/sickLeaveRequest`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                    isSuccess: true
                };
            } else {
                Alert.ERROR(res.response.data.error)
                return rejectWithValue(res?.response?.data?.error);
            }
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSubmitSickLaeveSlice = createSlice({
    name: "UserSubmitSickLaeve",
    initialState: {
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(userSubmitSickLaeve.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(userSubmitSickLaeve.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = action?.payload?.isSuccess;
            })
            .addCase(userSubmitSickLaeve.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default userSubmitSickLaeveSlice.reducer;
