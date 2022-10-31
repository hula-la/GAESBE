import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfo } from '../../models/user';

const initialState: User = {
  isLoading: false,
  userInfo: [],
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserInfoStart(state) {},
    fetchUserInfoSuccess(state, action) {
      state.userInfo = action.payload;
    },
    fetchUserInfoError(state, action) {
      state.error = action.payload.status;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
