import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, Http } from "helper";

// ********************* create Team   FUNCTIONALITY*********************

export const userSubmitLaeve = createAsyncThunk(
    "UserSubmitLaeve/UserSubmit",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`user/leaveRequest`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
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

export const userSubmitLaeveSlice = createSlice({
    name: "UserSubmitLaeve",
    initialState: {
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(userSubmitLaeve.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null
            })
            .addCase(userSubmitLaeve.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true
            })
            .addCase(userSubmitLaeve.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false
                state.error = action.payload;
            }),
});

export default userSubmitLaeveSlice.reducer;
