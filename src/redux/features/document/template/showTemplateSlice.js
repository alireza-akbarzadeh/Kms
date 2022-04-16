import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Alert, Http} from "helper";

export const showTemplate = createAsyncThunk(
    "showTemplate/template",
    async (id, {rejectWithValue}) => {
        const res = await Http(`document/template/${id}`, {method: "get"})
        if (res.status === 200) {
            return {data: res.data?.data};
        } else {
            Alert.ERROR(res.response.data.message)
            return rejectWithValue(res.response.data.errors)
        }
    }
);

const showTemplateSlice = createSlice({
    name: "TemplateList",
    initialState: {
        data: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTemplate.pending, (state) => {
                state.loading = true;
            })
            .addCase(showTemplate.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showTemplate.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});
export default showTemplateSlice.reducer;
