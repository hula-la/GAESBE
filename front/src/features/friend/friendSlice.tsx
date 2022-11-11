import { createSlice } from '@reduxjs/toolkit';

import { Action, FriendsInterface } from '../../models/friend';

interface FriendStateInterface {
  friends: FriendsInterface | null;
  isLoading: boolean;
  modal: string | null;
  secondModal: boolean;
  isSuccess: boolean;
  needReload: boolean;
}

const initialState: FriendStateInterface = {
  friends: null,
  isLoading: false,
  modal: null,
  secondModal: false,
  isSuccess: false,
  needReload: false,
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setNeedReload(state, action: Action<boolean>) {
      state.needReload = action.payload;
    },
    setIsSuccess(state, action: Action<boolean>) {
      state.isSuccess = action.payload;
    },
    handleModal(state, action) {
      // state.modal = !state.modal;
      state.modal = action.payload;
    },
    handleSecondModal(state) {
      state.secondModal = !state.secondModal;
    },
    setFriends(state, action: Action<FriendsInterface>) {
      state.friends = action.payload;
    },
    requestFriendStart(state, action: Action<string>) {
      state.isLoading = true;
    },
    requestFriendFinish(state) {
      state.isLoading = false;
    },
  },
});

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;
