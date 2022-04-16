import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, getError, Http} from "helper";

export const UpdateProjectDocs = createAsyncThunk(
    "UpdateProjectDocs/Resources",
    async ({id, data}, {rejectWithValue}) => {
       try {
           const res = await Http(`project/doc/update/${id}?_method=put`, {method: "post", data});
           if (res.status === 200) {
               Alert.SUCCESS(res.data.message);
               return {
                   data: res.data.message
               }
           }
       }catch (error) {
           return rejectWithValue(getError(error));
       }
    }
);

const UpdateProjectDocsSlice = createSlice({
    name: "UpdateProjectDocs",
    initialState: {
        data: [],
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(UpdateProjectDocs.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(UpdateProjectDocs.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(UpdateProjectDocs.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default UpdateProjectDocsSlice.reducer;
