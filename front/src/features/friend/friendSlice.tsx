
import { createSlice } from "@reduxjs/toolkit"

import { Action, FriendsInterface } from '../../models/friend'

interface FriendStateInterface {
  friends: FriendsInterface | null
  isLoading: boolean
  modal: boolean
  isSuccess: boolean
  needReload: boolean
}

const initialState: FriendStateInterface = {
  friends: null,
  isLoading: false,
  modal: false,
  isSuccess: false,
  needReload: false
}

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setNeedReload(state, action:Action<boolean>) {
      state.needReload = action.payload
    },
    setIsSuccess(state, action:Action<boolean>) {
      state.isSuccess = action.payload
    },
    handleModal(state) {
      state.modal = !state.modal
    },
    setFriends(state, action: Action<FriendsInterface>) {
      state.friends = action.payload
    },
    requestFriendStart(state, action: Action<string>) {
      state.isLoading = true
    },
    requestFriendFinish(state) {
      state.isLoading = false
    }
  }
})

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;