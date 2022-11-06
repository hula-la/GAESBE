import { useSelector } from 'react-redux'

import { InGameUsersInterface } from '../../../models/algo'


function AlgoBeforeStart({ handleLeaveRoom, startGame, inGameUsers }: any) {
  
  const { InGameInfo } = useSelector((state:any) => state.algo)
  const { userInfo } = useSelector((state: any) => state.auth)

  return <>
    <h1>시작 전 대기 방</h1>
    <button onClick={handleLeaveRoom}>대기방에서 나가기</button>
    {InGameInfo.master == userInfo.id && <button onClick={startGame}>배틀 시작하기</button>}
    {inGameUsers.map((user: InGameUsersInterface) => {
      return <div key={user.id}>
        <h2>{user.nickname}</h2>
        <p>{user.profileChar}</p>
      </div>
    })}
  </>
}
export default AlgoBeforeStart