import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const updateTags = createAsyncThunk(
    "UpdateTags/UpdateTag",
    async ({id, data}, {rejectWithValue}) => {
        try {
            const res = await Http(`document/tag/${id}`, {
                method: "put",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data);
                return {
                    data: res.data,
                };
            } else {
                Alert.ERROR(res.data.errors);
                return {
                    data: rejectWithValue(res.response.data.errors)
                };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const UpdateTagsSlice = createSlice({
    name: "UpdateTags",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateTags.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(updateTags.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default UpdateTagsSlice.reducer;
