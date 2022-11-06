import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/algo'
import { AlgoRoomInterface } from '../../models/algo'

type AlgoGameState = {
  isLoading: boolean;
  error: string | null;
  needReload: boolean;
  InGameInfo: AlgoRoomInterface | null
};

const initialState: AlgoGameState = {
  isLoading: false,
  error: null,
  InGameInfo: null,
  needReload: false,
};

const algoSlice = createSlice({
  name: 'algo',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    setNeedReload(state, action: Action<boolean>) {
      state.needReload = action.payload
    },
    creatAlgoRoom(state, action: Action<AlgoRoomInterface>) {
      state.isLoading = true
    },
    creatAlgoRoomSuccess(state) {
      state.isLoading = false
    },
    enterAlgoRoom(state, action: Action<AlgoRoomInterface>) {
      state.isLoading = true;
    },
    enterAlgoRoomSuccess(state, action: Action<AlgoRoomInterface>) {
      state.isLoading = false;
      state.InGameInfo = action.payload;
    },
    exitAlgoRoom(state) {
      state.InGameInfo = null
    }
  }
})

export const algoActions = algoSlice.actions;

export default algoSlice.reducer;
