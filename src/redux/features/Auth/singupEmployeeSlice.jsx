import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert, getError } from "helper";
import axios from "axios";
import Cookies from "js-cookie";

// ********************* USER SING UP  FUNCTIONALITY*********************

const ENDPOINT = process.env.REACT_APP_BASE_URL;

export const SingUpEmployee = createAsyncThunk(
  "AuthSignUpEmployee/signupEmployee",
  async ({data= null, type= null, unique= null}, { rejectWithValue }) => {
    try {
      const res = await axios.post(ENDPOINT + `user/employeeRegister/${type}/${unique}`, data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        Alert.SUCCESS(res.data.data);
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const signUpEmployeeSlice = createSlice({
  name: "AuthSignUpEmployee",
  initialState: {
    data: {},
    loading: false,
    success: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(SingUpEmployee.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SingUpEmployee.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(SingUpEmployee.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default signUpEmployeeSlice.reducer;
