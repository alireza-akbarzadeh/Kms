import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Http} from "helper/Http";


export const getTicket = createAsyncThunk(
    "GetTickets/tickets",
    async () => {
        const res = await Http(`ticket`, {
            method: "get",
        });
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

export const getTicketSlice = createSlice({
    name: "GetTickets",
    initialState: {
        loading: false,
        error: {},
        data: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action?.payload?.data;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getTicketSlice.reducer;
