import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchAlgoRoomList } from '../../../api/algoApi'
import { algoActions } from '../algorithmSlice'
import { AlgoRoomInterface } from '../../../models/algo'

import AlgoRoom from '../components/AlgoRoom'


function AlgoMainPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { needReload } = useSelector((state: any) => state.algo)
  const [roomList, setRoomList] = useState<{start:AlgoRoomInterface[], wait:AlgoRoomInterface[]}>({start:[], wait:[]})
  
  const handleMakeRoom = () => {
    navigate("make")
  }
  
  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    if (needReload) {
      fetchRooms()
      dispatch(algoActions.setNeedReload(false))
    }
  }, [needReload])
  
  const fetchRooms = async () => {
    try {
      const res = await fetchAlgoRoomList()
      setRoomList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReload = () => {
    fetchRooms()
  }

  return <>
    <h1>알고 배틀 메인 페이지</h1>
    <button onClick={handleMakeRoom}>방만들기</button>
    <button onClick={handleReload}>목록 다시 불러오기</button>
    <h2>진행중인 방</h2>
    {roomList.start.length>0 && roomList.start.map(room => {
      return <AlgoRoom key={room.roomCode} roomInfo={room} />
    })}
    <h2>대기중인 방</h2>
    {roomList.wait.length>0 && roomList.wait.map(room => {
      return <AlgoRoom key={room.roomCode} roomInfo={room} />
    })}
  </>
}
export default AlgoMainPage