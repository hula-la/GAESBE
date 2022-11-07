import { useSelector } from "react-redux"

import { FriendInterface } from '../../../models/friend'

function FriendList() {
  const { friends } = useSelector((state:any) => state.friend)
  
  return <>
    {friends.online && <>
      <h2>온라인 친구입니다</h2>
      {friends.online.map((onlineFriend: FriendInterface) => {
        return <div key={onlineFriend.id}>
          <p>{onlineFriend.nickname}</p>
          <p>{onlineFriend.profileChar}</p>
        </div>
      })
    }</>}
    {friends.offline && <>
      <h2>온라인 친구입니다</h2>
      {friends.offline.map((offlineFriend: FriendInterface) => {
        return <div key={offlineFriend.id}>
          <p>{offlineFriend.nickname}</p>
          <p>{offlineFriend.profileChar}</p>
        </div>
      })
    }</>}
  </>
}
export default FriendList