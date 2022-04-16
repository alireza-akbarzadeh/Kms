import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "helper";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BASE_URL;

// ********************* USER Forgot Password FUNCTIONALITY*********************

export const GenerateLinks = createAsyncThunk(
    "GenerateLinks/Invite",
    async ({email}, { rejectWithValue }) => {
        try {
            const res = await axios.get(ENDPOINT + `user/getLinks/${email}`, {
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
const GenerateLinksSlice = createSlice({
    name: "GenerateLinks",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(GenerateLinks.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(GenerateLinks.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(GenerateLinks.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.errors = action.payload;
            }),
});

export default GenerateLinksSlice.reducer;
