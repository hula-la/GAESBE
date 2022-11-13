import { createSlice } from '@reduxjs/toolkit';

import { Action, FriendsInterface } from '../../models/friend';

interface FriendStateInterface {
  friends: FriendsInterface | null;
  isLoading: boolean;
  modal: string | null;
  secondModal: boolean;
  isSuccess: boolean;
  needReload: boolean;
  isInvite: boolean;
  friendId: number | null;
  chatFriendId: number | null;
  invitedGameInfo: any;
  alarmList: any;
  waitFriendList: any;
  isChatOpen: boolean;
  chatList: any;
  sendContent: any;
}

const initialState: FriendStateInterface = {
  friends: null,
  isLoading: false,
  modal: null,
  secondModal: false,
  isSuccess: false,
  needReload: false,
  isInvite: false,
  friendId: null,
  chatFriendId: null,
  invitedGameInfo: null,
  alarmList: [],
  waitFriendList: [],
  isChatOpen: false,
  chatList: null,
  sendContent: null,
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
    // 게임에 친구 초대
    inviteFriend(state, action) {
      state.friendId = action.payload;
    },
    invitedGame(state, action) {
      state.invitedGameInfo = action.payload;
    },
    // 채팅 관련
    fetchAlarmList(state, action) {
      console.log(action);
    },
    fetchWaitFriend(state, action) {
      console.log(action);
    },
    openChatRoom(state, action) {
      state.chatFriendId = action.payload;
      state.isChatOpen = true;
    },
    closeChatRoom(state) {
      state.isChatOpen = false;
    },
    // 채팅 목록 불러오기
    fetchChatStart(state) {},
    fetchChatSuccess(state, action) {
      state.chatList = action.payload.chatList;
    },
    fetchChatError(state, action) {},
    // 채팅 보내기
    sendChat(state, action) {
      state.sendContent = action.payload;
      console.log(action.payload);
    },
    // 채팅 받기
    recieveChat(state, action) {
      const tmp = [action.payload.chatItem];
      const newArr = tmp.concat(state.chatList[action.payload.id]);
      state.chatList[action.payload.id] = newArr;
    },
  },
});

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;
