
function FriendListItem({friend}: any) {

  return <>
    <p>{friend.nickname}</p>
    <p>{friend.profileChar}</p>
  </>
}
export default FriendListItem