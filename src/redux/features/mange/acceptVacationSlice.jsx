import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const acceptVacation = createAsyncThunk(
    "AcceptVacationUser/vacationUser",
    async ({id, status, comment}) => {
        const res = await Http(`user/hr/leaveRequest/${id}/${status}?comment=${comment}`, {
            method: "get",
        });
        if (res.status === 200) {
            Alert.SUCCESS(res?.data?.data);
            return {data: res.data?.data};
        }
    }
);

const acceptVacationSlice = createSlice({
    name: "AcceptVacationUser",
    initialState: {
        loading: false,
        isSuccess: null,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(acceptVacation.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(acceptVacation.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(acceptVacation.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});

export default acceptVacationSlice.reducer;
