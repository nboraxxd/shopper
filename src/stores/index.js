import { configureStore } from '@reduxjs/toolkit'
import { ENV } from '@/config'
import { counterReducer } from '@/stores/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: ENV === 'development',
})
