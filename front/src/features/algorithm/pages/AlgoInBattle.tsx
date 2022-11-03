import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate  } from "react-router-dom"

import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

import { bojUserIdRequest } from '../../../api/algoApi'

import AlgoSelect from "../components/AlgoSelect"
import AlgoSolve from "../components/AlgoSolve"
import { algoActions } from "../algorithmSlice"


interface CustomWebSocket extends WebSocket {
  _transport?: any
}

function AlgoInBattle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const { roomCode } = useSelector((state:any) => state.algo)
  const [roomCode, setRoomCode] = useState('uDYw1g1C')
  const [progress, setProgress] = useState<string>('before')
  const [mes, setMes] = useState('')
  const [userName, setUserName] = useState('1')
  const [sessionId, setSesstionId] = useState('')
  const socket: CustomWebSocket = new SockJS('https://k7e104.p.ssafy.io:8081/api/ws')
  const client = Stomp.over(socket)

  // 최초 입장시 백준id보내기
  useEffect(() => {
    // roomCode 백준아이디
    bojUserIdRequest(roomCode, 'dkshktpq')
  }, [])

  // 입장할때 소켓 뚫기
  client.connect({}, frame => {
    // 뚫었으니 들어갔다고 알리기
    const enterRoom = () =>{
      client.send('/api/algo', {}, JSON.stringify({type:"ENTER",sessionId: socket._transport.url.slice(-18,-10), userId: userName, roomCode:roomCode}))
    }
    enterRoom()
    
    // 입장, 퇴장 관련 메세지 받을 위치
    client.subscribe(`/algo/room/${roomCode}`, (res) => {
      console.log("메세지 옴 ");
      console.log(JSON.parse(res.body));
    })
    
    // 게임 진행(문제 선택, 게임 끝 등) 관련 메세지 받을 위치
    client.subscribe(`/algo/problem/${roomCode}`, (res) => {
      console.log("메세지 옴 ");
      console.log(JSON.parse(res.body));
    })
  })

  window.onbeforeunload = function() {
    client.disconnect(() => {})
  }
  
  // 메세
  // client.send('/algo', {}, JSON.stringify({userName: userName, content: mes, roomCode:roomCode}))
  
  // 방 떠나기
  const leaveRoom = () =>{
    client.send('/api/algo', {}, JSON.stringify({type:"LEAVE", roomCode: roomCode ,sessionId: socket._transport.url.slice(-18,-10), userId: "9"}))
  }
  
  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML)
  }
  
  const handleLeaveRoom = async () => {
    await leaveRoom()
    await dispatch(algoActions.exitAlgoRoom())
    await client.disconnect(() => {})
    navigate('/game/algo/list')
  }

  return <>
    <h1>알고리즘 배틀 페이지</h1>
    <button onClick={handleProgress}>before</button>
    <button onClick={handleProgress}>battle</button>
    <button onClick={handleLeaveRoom}>나가기</button>
    {progress === 'before' ? <AlgoSelect client={client} /> : null}
    {progress === 'battle' ? <AlgoSolve client={client} />: null}
  </>
}
export default AlgoInBattle