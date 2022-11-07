import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"

import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

import { friendActions } from "../friendSlice"


interface CustomWebSocket extends WebSocket {
  _transport?: any
}

function FriendSocket() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state:any) => state.auth)
  const socket: CustomWebSocket = new SockJS('https://k7e104.p.ssafy.io:8081/api/ws')
  const client = Stomp.over(socket)

  useMemo(() => {
    if (userInfo) {
      client.connect({}, frame => {
        // 친구 목록 메세지 받을 위치
        client.subscribe(`/friend/${userInfo.id}`, (res) => {
          console.log('친구목록 들어옴')
          console.log(JSON.parse(res.body))
          dispatch(friendActions.setFriend(JSON.parse(res.body)))
        })

        // 뚫었으니 온라인이라고 알리기
        client.send('/api/friend/connect', {}, JSON.stringify({sessionId: socket._transport.url.slice(-18,-10), userId: userInfo.id}))
      })
    }
  }, [userInfo])
  return <>
  </>
}
export default FriendSocket