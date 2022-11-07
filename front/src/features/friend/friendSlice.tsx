
import { createSlice } from "@reduxjs/toolkit"

import { Action, FriendsInterface } from '../../models/friend'

interface FriendStateInterface {
  friends: FriendsInterface | null
  isLoading: boolean
  modal: string | null
}

const initialState: FriendStateInterface = {
  friends: null,
  isLoading: false,
  modal: null
}

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    handleModal(state, action: Action<string|null>) {
      state.modal = action.payload
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