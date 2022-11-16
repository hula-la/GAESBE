import { createSlice } from '@reduxjs/toolkit';

interface Result {
  correct: boolean;
  patten: number;
  point: number;
  winningStreak: number;
}

interface Coin {
  result: Result | null;
  isLoading: boolean;
}

const initialState: Coin = {
  result: null,
  isLoading: false,
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    requestCoinFlipStart(state, action) {
      state.isLoading = true;
    },
    requestCoinFlipSuccess(state, action) {
      state.result = action.payload;
      state.isLoading = false;
    },
    requestCoinFlipError(state, action) {},
    // 결과 리셋
    resetResult(state) {
      state.result = null;
    },
  },
});

export const coinActions = coinSlice.actions;

export default coinSlice.reducer;
