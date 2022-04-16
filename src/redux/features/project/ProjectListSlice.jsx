import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http, Params} from "helper";

export const getProjectList = createAsyncThunk(
    "ProjectList/Project",
    async ({page = 1, perPage = 15, search = null, filters = null, isPaginate = true}) => {
        const res = await Http(
            Params(`project`, {page, perPage, search, filters,isPaginate}),
            {method: "get"}
        );
        if (res.status === 200) {
            return {data: res.data?.data};
        }
    }
);

const projectListSlice = createSlice({
    name: "ProjectListSlice",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getProjectList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjectList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getProjectList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default projectListSlice.reducer;
