import { SERVICE_STATUS } from '@/config/serviceStatus'
import { authenticationService } from '@/services/authentication.service'
import { userService } from '@/services/user.service'
import { clearProfileFromLS, clearTokenFromLS, getProfileFromLS, setProfileToLS, setTokenToLS } from '@/utils/token'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: getProfileFromLS(),
  status: SERVICE_STATUS.idle,
}

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  try {
    const response = await authenticationService.login(data)
    setTokenToLS(response.data)

    const profile = await userService.getProfile()
    setProfileToLS(profile.data)

    return profile.data
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw err.response.data
  }
})

export const logoutAction = createAsyncThunk('auth/logout', (_, thunkAPI) => {
  thunkAPI.dispatch(authSlice.actions.logout())
  clearTokenFromLS()
  clearProfileFromLS()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = SERVICE_STATUS.pending
    })

    builder.addCase(loginAction.rejected, (state) => {
      state.status = SERVICE_STATUS.rejected
    })

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.status = SERVICE_STATUS.success
      state.profile = action.payload
    })
  },
})
