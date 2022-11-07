import { createSlice } from "@reduxjs/toolkit"; 

import { FriendsInterface, Action } from "../../models/friend";

interface FriendStateInterface {
  friends: FriendsInterface | null
}

const initialState: FriendStateInterface = {
  friends: null
};

const FriendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriends(state, action: Action<FriendsInterface>) {
      state.friends = action.payload
    }
  },
});

export const FriendActions = FriendSlice.actions;

export default FriendSlice.reducer;
