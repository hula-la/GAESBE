import { createSlice } from '@reduxjs/toolkit';
import { action } from '../../models/action'

type AlgoGame = {
  isLoading: boolean
  error: string | null
  roomCode: string | null
  needReload: boolean
}

const initialState: AlgoGame = {
  isLoading: false,
  error: null,
  roomCode: null,
  needReload: false,
}

const algoSlice = createSlice({
  name: 'algo',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null
    },
    enterAlgoBattleRoom(state, action: action<string>) {
      state.isLoading = true
    },
    enterAlgoBattleRoomSuccess(state, action: action<string>) {
      state.isLoading = false
      state.roomCode = action.payload
    }
  }
})

export const algoActions = algoSlice.actions

export default algoSlice.reducer