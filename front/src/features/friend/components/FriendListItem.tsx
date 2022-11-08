import { useDispatch } from 'react-redux'

import { deleteFriend } from '../../../api/friendApi'
import { friendActions } from '../friendSlice'

function FriendListItem({friend, type }: any) {
  const dispatch = useDispatch()

  const handleDeleteFriend =  async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const res = await deleteFriend(friend.id)
        if (res.status === 200) {
          dispatch(friendActions.setNeedReload(true))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return <>
    {type==='online' && <p>online</p>}
    {type==='offline' && <p>offline</p>}
    <p>{friend.nickname}</p>
    <p>{friend.profileChar}</p>
    {type==='manage' && <button onClick={handleDeleteFriend}>친구 삭제</button>}
  </>
}
export default FriendListItem