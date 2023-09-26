import { configureStore } from '@reduxjs/toolkit'
import { ENV } from '@/config'
import { counterReducer } from '@/stores/counterSlice'
import { authSlice } from '@/stores/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice.reducer,
  },
  devTools: ENV === 'development',
})
