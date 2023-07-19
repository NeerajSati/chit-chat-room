import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null
  },
  reducers: {
    loginUser: (state, action) => {
        console.log("Logging in")
    },
    registerUser: (state, action) => {
        console.log("Registering")
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, registerUser } = authSlice.actions

export default authSlice.reducer