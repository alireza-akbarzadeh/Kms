import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http, Params} from "helper";


export const getTeamsList = createAsyncThunk(
    "GetTeamsList/GetTeams",
    async ({page = 1, perPage = 15, search = null, filters = null, isPaginate = true}) => {
        const res = await Http(
            Params(`team/crud`, {page, perPage, search, filters, isPaginate}),
            {method: "get"}
        );
        if (res.status === 200) {
            return {data: res.data};
        }
    }
);


const TeamsListSlice = createSlice({
    name: "GetTeamsList",
    initialState: {
        data: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTeamsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTeamsList.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
            })
            .addCase(getTeamsList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default TeamsListSlice.reducer;
