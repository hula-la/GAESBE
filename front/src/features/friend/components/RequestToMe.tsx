
import { useEffect, useState } from 'react'
import { requestToMeList } from '../../../api/friendApi'

import {FriendInterface} from '../../../models/friend'
import RequestToMeItem from './RequestToMeItem'

interface RequestList {
  friendReqId: number
  requestUser: FriendInterface
}

function RequestToMe() {
  const [requestList, setRequestList] = useState<RequestList[]>([])
  const fetchRequestToMe = async () => {
    try {
      const res = await requestToMeList()
      if (res.status === 200) {
        setRequestList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRequestToMe()
  }, [])

  return <>
    <h1>친구 요청 목록</h1>
    {requestList.length > 0 ? <>
      {requestList.map((requestListItem:RequestList) => {
        return <RequestToMeItem key={requestListItem.friendReqId} requestListItem={requestListItem} fetchRequestToMe={fetchRequestToMe} />
      })}</>
    : <h2>친구요청이 없습니다</h2>}
  </>
}
export default RequestToMe