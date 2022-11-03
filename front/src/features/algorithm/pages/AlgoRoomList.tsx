import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAlgoRoomList } from '../../../api/algoApi'
import { AlgoRoomInterface } from '../../../models/algo'

import AlgoRoom from '../components/AlgoRoom'

function AlgoRoomList() {
  const navigate = useNavigate()

  const handleGoMain= () => {
    navigate('/game/algo')
  }

  const [roomList, setRoomList] = useState<AlgoRoomInterface[]>([])
  const fetchRooms = async () => {
    try {
      const res = await fetchAlgoRoomList()
      setRoomList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleReload = () => {
    fetchRooms()
  }

  return <>
    <h1>알고 배틀 방 목록</h1>
    <button onClick={handleGoMain}>메인으로</button>
    <button onClick={handleReload}>목록 다시 불러오기</button>
    {roomList && roomList.map(room => {
      return <AlgoRoom key={room.roomCode} roomInfo={room} />
    })}
  </>
}
export default AlgoRoomList