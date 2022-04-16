import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

// ********************* USER Reset PassWord  FUNCTIONALITY*********************

export const restUserNameAction = createAsyncThunk(
    "ResetUserName/restUser",
    async (data, {rejectWithValue}) => {
        try {
            const res = await Http("user/profile?_method=PUT", {method: "post", data});
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

const resetUserNameSlice = createSlice({
    name: "ResetUserName",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(restUserNameAction.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(restUserNameAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(restUserNameAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default resetUserNameSlice.reducer;
