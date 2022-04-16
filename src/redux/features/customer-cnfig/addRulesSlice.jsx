import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, getError} from "helper";
import {Http} from "helper/Http";

// ********************* USER Add Rules  FUNCTIONALITY*********************

export const addRulesCusetomer = createAsyncThunk("AddRulesCustomer/AddRules", async (data, {rejectWithValue}) => {
    try {
        const res = await Http(`customer/config/rule`, {
            method: "post", data,
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
});

export const addRulesSlice = createSlice({
    name: "AddRulesCustomer", initialState: {
        loading: false, error: {}, isSuccess: null
    }, reducers: {}, extraReducers: (b) => b
        .addCase(addRulesCusetomer.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = null;
        })
        .addCase(addRulesCusetomer.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(addRulesCusetomer.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});

export default addRulesSlice.reducer;
