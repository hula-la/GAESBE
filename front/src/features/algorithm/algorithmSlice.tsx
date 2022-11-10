import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/algo'
import { AlgoRoomInterface } from '../../models/algo'

type AlgoGameState = {
  isLoading: boolean;
  error: string | null;
  needReload: boolean;
  InGameInfo: AlgoRoomInterface | null
  solve: boolean
};

const initialState: AlgoGameState = {
  isLoading: false,
  error: null,
  InGameInfo: null,
  needReload: false,
  solve: false
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
    },
    checkMyAnswerRequestStart(state, action: Action<{roomCode:string, problemId: number, userBjId: string, lanId: number}>) {
      console.log('dispatch실행됨')
      state.isLoading = true
    },
    solveSuccess(state, action: Action<boolean>) {
      state.solve = action.payload
    }
  }
})

export const algoActions = algoSlice.actions;

export default algoSlice.reducer;
