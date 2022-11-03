import React, { useState, useEffect } from "react"
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import AlgoSelect from "../components/AlgoSelect"
import AlgoSolve from "../components/AlgoSolve"

function AlgoInBattle() {
  const [progress, setProgress] = useState<string>('before')
  const [mes, setMes] = useState('')
  const [userName, setUserName] = useState('')
  const [roomCode, setRoomCode] = useState('TkFnjuDf')
  const [sessionId, setSesstionId] = useState('')
  const socket = new SockJS('https://k7e104.p.ssafy.io:8081/api/ws')
  const client = Stomp.over(socket)

  // client.connect({}, frame => {
  //   console.log('frame', frame)
    
    // const enterRoom = () =>{
    //   client.send('/api/algo', {}, JSON.stringify({type:"ENTER",sessionId: socket._transport.url.slice(-18,-10), userId: "9", roomCode:roomCode}))
    // }
  //   client.subscribe('/algo/room/'+"RbY1qkop", (res) => {
  //     console.log("메세지 옴 ");
  //     console.log(JSON.parse(res.body));

  //   })
  // })
  window.onbeforeunload = function() {
    return "게임에서 자동으로 기권처리 됩니다";
  }
  // 메세
  // client.send('/algo', {}, JSON.stringify({userName: userName, content: mes, roomCode:roomCode}))

  // 방 떠나기
  // const leaveRoom = () =>{
  //   client.send('/api/algo', {}, JSON.stringify({type:"LEAVE",sessionId: socket._transport.url.slice(-18,-10), userId: "9", roomCode:roomCode}))
  // }
  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML)
  }

  return <>
    <h1>알고리즘 배틀 페이지</h1>
    <button onClick={handleProgress}>before</button>
    <button onClick={handleProgress}>battle</button>
    {progress === 'before' && <AlgoSelect />}
    {progress === 'battle' && <AlgoSolve />}
  </>
}
export default AlgoInBattle