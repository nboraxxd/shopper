import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const { actions: counterActions, reducer: counterReducer } = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action) {
      state.value + action.payload
    },
    decrement(state, action) {
      state.value - action.payload
    },
  },
})
