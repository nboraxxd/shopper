import { configureStore } from '@reduxjs/toolkit'
import { ENV } from '@/config'
import { counterReducer } from '@/stores/counterSlice'
import { authReducer } from '@/stores/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  devTools: ENV === 'development',
})
