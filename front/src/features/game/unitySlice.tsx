import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageNum: 0,
};

const unitySlice = createSlice({
  name: 'unity',
  initialState,
  reducers: {
    changePageNum(state, action) {
      state.pageNum = action.payload;
    },
  },
});

export const unityActions = unitySlice.actions;

export default unitySlice.reducer;
