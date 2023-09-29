import { configureStore } from '@reduxjs/toolkit'
import { ENV } from '@/config'
import { counterReducer } from '@/stores/counterSlice'
import { authReducer, getUserAction } from '@/stores/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  devTools: ENV === 'development',
})

store.dispatch(getUserAction())
