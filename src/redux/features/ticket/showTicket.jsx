import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "helper/Http";


export const showTicket = createAsyncThunk(
    "GetDepartments/departments",
    async (id) => {
        const res = await Http(`ticket/${id}`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const showTicketSlice = createSlice({
    name: "GetDepartments",
    initialState: {
        loading: false,
        error: {},
        data: [],
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(showTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(showTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default showTicketSlice.reducer;
