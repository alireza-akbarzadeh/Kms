import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const CloseTicket = createAsyncThunk(
    "CloseTicket/Tickets",
    async (id, { rejectWithValue }) => {
        try {
            const res = await Http(`ticket/close/${id}`, {
                method: "get",
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
    }
);

export const CloseTicketSlice = createSlice({
    name: "CloseTicket",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(CloseTicket.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(CloseTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.isSccess = true;
            })
            .addCase(CloseTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSccess = false;
            }),
});

export default CloseTicketSlice.reducer;
