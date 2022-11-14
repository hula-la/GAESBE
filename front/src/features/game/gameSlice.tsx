import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  record: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    fetchRecordStart(state) {
      // console.log('이건 시작했지 ㅋㅋ');
    },
    fetchRecordSuccess(state, action) {
      // console.log(action);
      state.record = action.payload;
      console.log(state.record);
    },
    fetchRecordError(state, action) {},
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
