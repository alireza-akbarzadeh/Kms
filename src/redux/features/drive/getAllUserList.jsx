import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "helper";

export const getAllUserList = createAsyncThunk(
    "GetUserList/userList",
    async ({isPaginate = true}) => {
        const res = await Http(
            `user/customerIndex?isPaginate=${isPaginate}`,
            {method: "get"}
        );
        if (res.status === 200) {
            return {data: res.data};
        }
    }
);


const AllUserListSlice = createSlice({
    name: "GetUserList",
    initialState: {
        data: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getAllUserList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUserList.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
            })
            .addCase(getAllUserList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default AllUserListSlice.reducer;
