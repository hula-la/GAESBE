import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchAlgoRoomList } from '../../../api/algoApi'
import { algoActions } from '../algorithmSlice'
import { AlgoRoomInterface } from '../../../models/algo'

import AlgoRoom from '../components/AlgoRoom'

function AlgoRoomList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { needReload } = useSelector((state: any) => state.algo)
  const [roomList, setRoomList] = useState<AlgoRoomInterface[]>([])

  useEffect(() => {
    if (needReload) {
      fetchRooms()
      dispatch(algoActions.setNeedReload(false))
    }
  }, [needReload])
  
  const handleGoMain= () => {
    navigate('/game/algo')
  }
  
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