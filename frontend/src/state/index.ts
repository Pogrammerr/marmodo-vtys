import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    user: userReducer,
  }
})