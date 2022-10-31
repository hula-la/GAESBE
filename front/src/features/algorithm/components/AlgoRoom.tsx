
interface Props {
  roomInfo: {
    title: string
    roomCode: string
  }
}

function AlgoRoom({roomInfo}: Props) {

  const handleEnterRoom = () => {
    console.log(roomInfo.roomCode)
  }

  return <>
    <h2>방 제목 : {roomInfo.title}</h2>
    <button onClick={handleEnterRoom}>입장하기</button>
  </>
}
export default AlgoRoom