import { createSlice } from '@reduxjs/toolkit';
import { Action, TypingRoomInterface } from '../../models/typing';
type TypingGame = {
  roomCode: string | null;
};

const initialState: TypingGame = {
  roomCode: null,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    createTypingRoom(state, action: Action<TypingRoomInterface>) {
      console.log('실행됨?');
      state.roomCode = 'asd';
      console.log(state.roomCode);
      console.log(action, '이거 액션');
    },
  },
});

export const typingActions = typingSlice.actions;

export default typingSlice.reducer;
