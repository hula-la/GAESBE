import { useSelector } from 'react-redux'

import BeforeSolveUsers from './BeforeSolveUsers'
import LoadingSpinner from './LoadingSpinner'


function AlgoBeforeStart({ handleLeaveRoom, startGame, inGameUsers }: any) {
  
  const { InGameInfo, loadingMsg } = useSelector((state:any) => state.algo)
  const { userInfo } = useSelector((state: any) => state.auth)

  return <>
    <h1>시작 전 대기 방</h1>
    {loadingMsg==='START' && <LoadingSpinner loadingMsg='곧 배틀이 시작됩니다' />}
    <BeforeSolveUsers inGameUsers={inGameUsers} />
    <button onClick={handleLeaveRoom}>대기방에서 나가기</button>
    {InGameInfo.master == userInfo.id && <button onClick={startGame}>배틀 시작하기</button>}
  </>
}
export default AlgoBeforeStart