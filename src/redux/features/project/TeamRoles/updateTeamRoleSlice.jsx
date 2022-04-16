import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http, Alert } from "helper";
import axios from "axios";
import Cookies from "js-cookie";

// ********************* create Team   FUNCTIONALITY*********************

export const updateTeamRole = createAsyncThunk(
    "updateTeamRole/TeamRole",
    async ({ id, totalData }, { rejectWithValue }) => {
        try {
           const res =  await axios({
                url:  process.env.REACT_APP_BASE_URL + `teamRole/${id}`,
                method: 'PUT',
                data: totalData,
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                }
            })
               .then(response => {
                   Alert.SUCCESS(response.data.message);
                   return {
                       data: response.data,
                   }
           })
               .catch(error => {
                   Alert.ERROR(error.response.data.message)
                   return rejectWithValue(error?.response?.data?.errors)
               })
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const updateTeamRoleSlice = createSlice({
    name: "updateTeam",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateTeamRole.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null
            })
            .addCase(updateTeamRole.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true
            })
            .addCase(updateTeamRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false
            }),
});

export default updateTeamRoleSlice.reducer;
