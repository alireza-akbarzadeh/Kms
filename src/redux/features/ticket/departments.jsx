import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "helper";
import { Http } from "helper/Http";


export const getDepartments = createAsyncThunk(
    "GetDepartments/departments",
    async () => {
        const res = await Http(`ticket/department/index`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const getDepartmentsSlice = createSlice({
    name: "GetDepartments",
    initialState: {
        loading: false,
        error: {},
        data: [],
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDepartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getDepartmentsSlice.reducer;
