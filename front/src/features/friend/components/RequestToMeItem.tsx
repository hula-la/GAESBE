
import { requestToMeDelete, requestToMeAccept } from '../../../api/friendApi'

function RequestToMeItem({requestListItem, fetchRequestToMe}: any) {
  
  const requestDelete = async () => {
    try {
      const res = await requestToMeDelete(requestListItem.friendReqId)
      console.log(res)
      if (res.status === 200) {
        fetchRequestToMe()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const requestAccept = async () => {
    try {
      const res = await requestToMeAccept(requestListItem.requestUser.friendId)
      console.log(res)
      if (res.status === 200) {
        fetchRequestToMe()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <h2>{requestListItem.requestUser.nickname}</h2>
    <p>{requestListItem.requestUser.profileChar}</p>
    <button onClick={requestAccept}>수락</button>
    <button onClick={requestDelete}>거절</button>
  </>
}
export default RequestToMeItem