import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  }
})