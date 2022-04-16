import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, getError} from "helper";
import {Http} from "helper/Http";


export const updateProject = createAsyncThunk(
    "UpdateProject/project",
    async ({data, id}, {rejectWithValue}) => {
        try {
            const res = await Http(`project/${id}?_method=put`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                return {
                    data: res.data
                };
            } else {
                Alert.SUCCESS(res.data.errors);
                return {
                    data: rejectWithValue(res.data),
                };
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
    }
);

export const updateProjectSlice = createSlice({
    name: "UpdateProject",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null,
        status: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateProject.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default updateProjectSlice.reducer;
