import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* customer Update Profile  FUNCTIONALITY*********************
export const updateWorkspace = createAsyncThunk(
    "updateWorkspace/workspace",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`customer/config/profile?_method=PUT`, {
                method: "post",
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

export const updateWorkspaceSlice = createSlice({
    name: "updateWorkspace",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateWorkspace.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateWorkspace.fulfilled, (state) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default updateWorkspaceSlice.reducer;
