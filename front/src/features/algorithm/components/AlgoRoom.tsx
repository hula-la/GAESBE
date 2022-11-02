
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
    <h2>문제 난이도 : <img src={`/img/tier/${roomInfo.tier}.svg`} alt={`난이도${roomInfo.tier}`} /></h2>
    <h3>제한시간 : {roomInfo.time} 분</h3>
    <p>입장 인원 : {roomInfo.num} / 4</p>
    <button onClick={handleEnterRoom}>입장하기</button>
  </>
}
export default AlgoRoom