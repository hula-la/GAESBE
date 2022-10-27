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
    loginKakaoStart(state, action) {},
    loginKakaoSuccess(state, action: PayloadAction<String>) {
      console.log(action);
    },
    loginKakaoError(state, action) {
      state.error = action.payload;
    },
    loginNaverStart(state, action) {},
    loginNaverSuccess(state, action: PayloadAction<String>) {
      console.log(action);
    },
    loginNaverError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
