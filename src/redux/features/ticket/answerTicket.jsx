import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import { Http } from "helper/Http";


export const AnswerTicket = createAsyncThunk(
    "AnswerTicket/Tickets",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Http(`ticket/message`, {
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

export const AnswerTicketSlice = createSlice({
    name: "AnswerTicket",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(AnswerTicket.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(AnswerTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.isSccess = true;
            })
            .addCase(AnswerTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSccess = false;
            }),
});

export default AnswerTicketSlice.reducer;
