import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

// ********************* USER Reset PassWord  FUNCTIONALITY*********************

export const UpdateUserAction = createAsyncThunk("UpdateUserName/UpdateUser", async ({id, data}, {rejectWithValue}) => {
    try {
        const res = await Http(`user/updateRole/${id}?_method=put`, {
            method: "post", data: data
        });
        if (res.status === 200) {
            Alert.SUCCESS(res.data.message);
            return {
                data: res.data?.data,
            };
        } else {
            Alert.ERROR(res?.response?.data.errors);
            return rejectWithValue(res?.response?.data.errors);
        }
    } catch (error) {
        Alert.ERROR(error?.response?.data.errors);
        return rejectWithValue(error?.response?.data.errors);
    }
});

const initialState = {
    error: [], loading: false, data: undefined, isSuccess: false,
};
const updateUserRolesSlice = createSlice({
    name: "UpdateUserName", initialState: initialState, reducers: {}, extraReducers: (b) => b
        .addCase(UpdateUserAction.pending, (state) => {
            state.loading = true;
            state.isSuccess = null;
        })
        .addCase(UpdateUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.data = action.payload.data;
        })
        .addCase(UpdateUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isSuccess = false;
        }),
});
export default updateUserRolesSlice.reducer;
