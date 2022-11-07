import { useSelector } from "react-redux"

import { FriendInterface } from '../../../models/friend'

import FriendListItem from "../components/FriendListItem"

function FriendList() {
  const { friends } = useSelector((state:any) => state.friend)
  
  return <>
    {friends.online && <>
      <h3>온라인 친구입니다</h3>
      {friends.online.map((onlineFriend: FriendInterface) => {
        return <FriendListItem key={onlineFriend.id} friend={onlineFriend} />
      })
    }</>}
    {friends.offline && <>
      <h3>오프라인 친구입니다</h3>
      {friends.offline.map((offlineFriend: FriendInterface) => {
        return <FriendListItem key={offlineFriend.id} friend={offlineFriend} />
      })
    }</>}
  </>
}
export default FriendList