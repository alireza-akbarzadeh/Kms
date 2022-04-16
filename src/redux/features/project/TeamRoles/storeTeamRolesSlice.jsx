import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";

// ********************* create Team Role FUNCTIONALITY*********************

export const createTeamRole = createAsyncThunk(
    "CreateTeamRole/Team",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`teamRole`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data,
                };
            }
            if (res.response.status === 422) {
                Alert.ERROR(res.response.data.errors?.title[0])
                return rejectWithValue(res?.response?.data?.errors);
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const createTeamRoleSlice = createSlice({
    name: "CreateTeamRole",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(createTeamRole.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(createTeamRole.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(createTeamRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default createTeamRoleSlice.reducer;
