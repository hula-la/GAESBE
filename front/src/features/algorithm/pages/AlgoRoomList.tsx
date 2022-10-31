import { useNavigate } from 'react-router-dom'

import AlgoRoom from '../components/AlgoRoom'

function AlgoRoomList() {
  const navigate = useNavigate()

  const handleGoMain= () => {
    navigate('/meta')
  }

  const roomList: { title: string, roomCode: string }[] = [{title: '더미데이터1', roomCode: '1'}, {title: '더미데이터2', roomCode: '2'}, {title: '더미데이터3', roomCode: '3'}, {title: '더미데이터4', roomCode: '4'}, {title: '더미데이터5', roomCode: '5'}, {title: '더미데이터6', roomCode: '6'}, {title: '더미데이터7', roomCode: '7'}, {title: '더미데이터8', roomCode: '8'}]  

  return <>
    <h1>알고 배틀 방 목록</h1>
    <button onClick={handleGoMain}>메인으로</button>
    {roomList.map(room => {
      return <AlgoRoom key={room.roomCode} roomInfo={room} />
    })}
  </>
}
export default AlgoRoomList