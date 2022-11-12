import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { algoActions } from '../algorithmSlice'
import { AlgoRoomInterface } from '../../../models/algo'

interface Props {
  roomInfo: AlgoRoomInterface
}

function AlgoRoom({roomInfo}: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { InGameInfo } = useSelector((state: any) => state.algo)
  const {userInfo} = useSelector((state:any) => state.auth)

  const handleEnterRoom = () => {
    if (userInfo.bjId) {
      dispatch(algoActions.enterAlgoRoom(roomInfo))
    } else {
      alert('백준아이디를 연동해야지만 게임을 할 수 있습니다')
      navigate('/game/algo')
    }
  }

  useEffect(() => {
    if (InGameInfo) {
      navigate('/game/algo/battle')
    }
  }, [InGameInfo])

  return <>
    <h2>문제 난이도 : <img src={`/img/tier/${roomInfo.tier}.svg`} alt={`난이도${roomInfo.tier}`} style={{ width: '1.2rem', height: '1.2rem'}} /></h2>
    <h3>제한시간 : {roomInfo.time} 분</h3>
    <p>입장 인원 : {roomInfo.num} / 4</p>
    {!roomInfo.start && <button onClick={handleEnterRoom}>입장하기</button>}
  </>
}
export default AlgoRoom