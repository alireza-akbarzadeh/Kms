import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert} from "helper";
import {Http} from "helper/Http";

export const UpdateKnowledge = createAsyncThunk(
    "UpdateKnowledge/knowledge",
    async ({data}, {rejectWithValue}) => {
        try {
            const res = await Http(`/document/update/knowledge`, {
                method: "post",
                data,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data)
                return {
                    data: res.data,
                };
            } else {
                Alert.ERROR(res.response.data.error);
                return {
                    data: rejectWithValue(res.response.data.errors)
                };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const UpdateKnowledgeSlice = createSlice({
    name: "UpdateKnowledge",
    initialState: {
        loading: false,
        error: {},
        isSuccess: null
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(UpdateKnowledge.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(UpdateKnowledge.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(UpdateKnowledge.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
            }),
});

export default UpdateKnowledgeSlice.reducer;
