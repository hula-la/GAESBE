import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAlgoRoomList } from '../../../api/algoApi'

import AlgoRoom from '../components/AlgoRoom'

function AlgoRoomList() {
  const navigate = useNavigate()

  const handleGoMain= () => {
    navigate('/meta')
  }

  const [roomList, setRoomList] = useState<{code:string, time: string, tier: string, num: string}[]>([])
  const fetchRooms = async () => {
    const res = await fetchAlgoRoomList()
    setRoomList(res.data)
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
      return <AlgoRoom key={room.code} roomInfo={room} />
    })}
  </>
}
export default AlgoRoomList