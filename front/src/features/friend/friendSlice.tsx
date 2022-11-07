import { createSlice } from "@reduxjs/toolkit"

import { Action, FriendsInterface } from '../../models/friend'


interface FriendStateInterface {
  friends: FriendsInterface | null
}


const initialState: FriendStateInterface = {
  friends: null
}

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriend(state, action: Action<FriendsInterface>) {
      state.friends = action.payload
    }
  }
})

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;