import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const SaveKnowledgeAsDoc = createAsyncThunk(
    "SaveKnowledgeAsDoc/knowledge",
    async ({id}, {rejectWithValue}) => {
        const res = await Http(`document/save/knowledge/${id}`, {method: "get"})
        if (res.status === 200) {
            Alert.SUCCESS(res.data.data)
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const SaveKnowledgeAsDocSlice = createSlice({
    name: "SaveKnowledgeAsDoc",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(SaveKnowledgeAsDoc.pending, (state) => {
                state.loading = true;
            })
            .addCase(SaveKnowledgeAsDoc.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(SaveKnowledgeAsDoc.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default SaveKnowledgeAsDocSlice.reducer;
