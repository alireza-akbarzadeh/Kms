import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "helper";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Forgot Password FUNCTIONALITY*********************

export const CheckInviteLink = createAsyncThunk(
    "CheckInviteLink/Invite",
    async ({unique}, { rejectWithValue }) => {
        try {
            const res = await axios.get(ENDPOINT + `user/checkInviteLink/${unique}`, {
                withCredentials: true,
            });
            if (res.status === 200) {return {
                    data: res.data.data,
                };
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    data: {},
    errors: {},
    loading: false,
    isSuccess: false,
};
const CheckInviteLinkSlice = createSlice({
    name: "CheckInviteLink",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(CheckInviteLink.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(CheckInviteLink.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(CheckInviteLink.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.errors = action.payload;
            }),
});

export default CheckInviteLinkSlice.reducer;
