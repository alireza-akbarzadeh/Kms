import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "helper";

export const getHrStudyTime = createAsyncThunk(
  "HrStudyTime/HrStudy",
  async ({id = null}) => {
      let url = `user/hr/logIndex/studyTime/index`
      if (id !== null){
          url += `?user_id=${id}`
      }
    const res = await Http(url, {
      method: "get",
    });
    if (res.status === 200) {
      return { data: res.data.data };
    }
  }
);

const hrStudyTimeSlice = createSlice({
  name: "HrStudyTime",
  initialState: {
    loading: false,
    error: {},
    data: [],
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(getHrStudyTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHrStudyTime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getHrStudyTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default hrStudyTimeSlice.reducer;
