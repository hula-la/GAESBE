
interface Props {
  roomInfo: {
    code:string
    time: string
    tier: string
    num: string
  }
}

function AlgoRoom({roomInfo}: Props) {

  const handleEnterRoom = () => {
    console.log(roomInfo.code)
  }

  return <>
    <h2>방 제목 : {roomInfo.tier}</h2>
    <button onClick={handleEnterRoom}>입장하기</button>
  </>
}
export default AlgoRoom