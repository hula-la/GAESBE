import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  record: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    fetchRecordStart(state) {},
    fetchRecordSuccess(state, action) {
      console.log(action);
    },
    fetchRecordError(state, action) {},
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
