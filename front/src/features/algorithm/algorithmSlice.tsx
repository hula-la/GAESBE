import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/algo'
import { AlgoRoomInterface, RecordSendInterface } from '../../models/algo'

type AlgoGameState = {
  isLoading: boolean;
  needReload: boolean;
  InGameInfo: AlgoRoomInterface | null
  solve: boolean,
  gameResultMsg: string
};

const initialState: AlgoGameState = {
  isLoading: false,
  InGameInfo: null,
  needReload: false,
  solve: false,
  gameResultMsg: ''
};

const algoSlice = createSlice({
  name: 'algo',
  initialState,
  reducers: {
    loadingEnd(state) {
      state.isLoading = false
    },
    setNeedReload(state, action: Action<boolean>) {
      state.needReload = action.payload
    },
    creatAlgoRoom(state, action: Action<AlgoRoomInterface>) {},
    enterAlgoRoom(state, action: Action<AlgoRoomInterface>) {},
    enterAlgoRoomSuccess(state, action: Action<AlgoRoomInterface>) {
      state.InGameInfo = action.payload;
    },
    exitAlgoRoom(state) {
      state.InGameInfo = null
    },
    checkMyAnswerRequestStart(state, action: Action<{roomCode:string, problemId: number, userBjId: string, lanId: number}>) {
      state.isLoading = true
    },
    solveSuccess(state, action: Action<boolean>) {
      state.solve = action.payload
    },
    sendMyRank(state, action: Action<RecordSendInterface>) {},
    setGameResult(state, action: Action<string>) {
      state.gameResultMsg = action.payload
    }
  }
})

export const algoActions = algoSlice.actions;

export default algoSlice.reducer;
