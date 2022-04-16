import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";
export const getStudyTime = createAsyncThunk("GetStudyTime/StudyTime", async (type = null) => {

    const res = await Http("user/logIndex/studyTime", { method: "get" });
    if (res.status === 200) {
        return { data: res.data?.data };
    }
});
const getStudyTimeSlice = createSlice({
    name: "GetStudyTime",
    initialState: {
        data: [],
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getStudyTime.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStudyTime.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
            })
            .addCase(getStudyTime.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload;
            }),
});

export default getStudyTimeSlice.reducer;

