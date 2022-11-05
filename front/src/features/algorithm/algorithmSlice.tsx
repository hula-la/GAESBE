import { createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/algo'
import { AlgoRoomInterface } from '../../models/algo'

type AlgoGame = {
  isLoading: boolean;
  error: string | null;
  roomCode: string | null;
  needReload: boolean;
};

const initialState: AlgoGame = {
  isLoading: false,
  error: null,
  roomCode: null,
  needReload: false,
};

const algoSlice = createSlice({
  name: 'algo',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    creatAlgoRoom(state, action: Action<AlgoRoomInterface>) {
      state.isLoading = true
    },
    creatAlgoRoomSuccess(state) {
      state.isLoading = false
    },
    enterAlgoRoom(state, action: Action<string>) {
      state.isLoading = true;
    },
    enterAlgoRoomSuccess(state, action: Action<string>) {
      state.isLoading = false;
      state.roomCode = action.payload;
    },
    exitAlgoRoom(state) {
      state.roomCode = null
    }
  }
})

export const algoActions = algoSlice.actions;

export default algoSlice.reducer;
