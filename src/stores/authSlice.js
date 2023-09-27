import { SERVICE_STATUS } from '@/config/serviceStatus'
import { authenticationService } from '@/services/authentication.service'
import { userService } from '@/services/user.service'
import { clearUserFromLS, clearTokenFromLS, getUserFromLS, setUserToLS, setTokenToLS } from '@/utils/token'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: getUserFromLS(),
  status: SERVICE_STATUS.idle,
}

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  try {
    const response = await authenticationService.login(data)
    setTokenToLS(response.data)

    const user = await userService.getUser()
    setUserToLS(user.data)

    return user.data
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw err.response.data
  }
})

export const loginByCodeAction = createAsyncThunk('auth/loginByCode', async (code) => {
  try {
    const response = await authenticationService.loginByCode({ code })
    setTokenToLS(response.data)

    const user = await userService.getUser()
    setUserToLS(user.data)

    return user.data
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw err.response.data
  }
})

export const logoutAction = createAsyncThunk('auth/logout', (_, thunkAPI) => {
  thunkAPI.dispatch(authSlice.actions.logout())
  clearTokenFromLS()
  clearUserFromLS()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },

    setUser: (state, action) => {
      state.user = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = SERVICE_STATUS.pending
    })

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.status = SERVICE_STATUS.successful
      state.user = action.payload
    })

    builder.addCase(loginAction.rejected, (state) => {
      state.status = SERVICE_STATUS.rejected
    })

    builder.addCase(loginByCodeAction.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})
