import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginAPI, registerAPI } from '../components/utils/api';
import axios from 'axios'
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
      const {email,password} = payload;
      try {
        const userAuth = await axios.post(loginAPI(), {
          email,
          password,
        });
        return userAuth.data;
      } catch (err) {
        if(err?.response?.data?.msg){
          toast.error(err?.response?.data?.msg);
        } else{
          toast.error("Something went wrong");
        }
        throw err;
      }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
      const {formContent} = payload
      console.log(payload)
      try {
        const userAuth = await axios.post(registerAPI(),formContent, {
          headers: {
            "content-type": "multipart/form-data",
          }
        });
        toast.success("Successfully Registered! Logging you in...")
        return userAuth.data;
      } catch (err) {
        if(err?.response?.data?.msg){
          toast.error(err?.response?.data?.msg);
        } else{
          toast.error("Something went wrong");
        }
        throw err;
      }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: "",
    status: "IDLE"
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state, action) => {
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.authToken = action.payload.token;
      localStorage.setItem('authToken', JSON.stringify(action.payload.token));
    })
    .addCase(loginUser.rejected, (state, action) => {
      throw action.error;
    })
    .addCase(registerUser.pending, (state, action) => {
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.authToken = action.payload.token;
      localStorage.setItem('authToken', JSON.stringify(action.payload.token));
    })
    .addCase(registerUser.rejected, (state, action) => {
      throw action.error;
    })
  },
})

export default authSlice.reducer