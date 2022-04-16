import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const createTicket = createAsyncThunk(
    "CreateTicket/EmptyTicket",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`ticket`, {
                method: "post",
                data,
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

export const createTicketSlice = createSlice({
    name: "CreateTicket",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(createTicket.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.isSccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSccess = false;
            }),
});

export default createTicketSlice.reducer;
