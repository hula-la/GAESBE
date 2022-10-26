import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../models/user"

const initialState: User = {
  isLoading: false,
  userInfo: [],
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginKakaoSuccess(state, action) {
      state.userInfo = action.payload
    },
    loginKakaoError(state, action) {
      state.error = action.payload
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer