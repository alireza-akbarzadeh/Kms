import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* create Team   FUNCTIONALITY*********************

export const createSubmitStudyTime = createAsyncThunk(
    "UserSubmitStudyTime/UserSubmitStudy",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`user/setStudyTime`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                };
            } else {
                Alert.ERROR(res.response.data.message)
                return rejectWithValue(res?.response?.data?.errors);
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const createSubmitStudyTimeSlice = createSlice({
    name: "UserSubmitStudyTime",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(createSubmitStudyTime.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createSubmitStudyTime.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                
            })
            .addCase(createSubmitStudyTime.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default createSubmitStudyTimeSlice.reducer;
