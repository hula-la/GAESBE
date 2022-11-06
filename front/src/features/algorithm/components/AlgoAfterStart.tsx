import { useState } from "react"
import { useSelector } from "react-redux"

import AlgoSelect from "./AlgoSelect"
import AlgoSolve from "./AlgoSolve"

function AlgoAfterStart({ client, handleLeaveRoom, problemList, problemIndex }: any) {
  const {InGameInfo} = useSelector((state:any) => state.algo)
  const [progress, setProgress] = useState<string>('select')

  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML)
  }

  const passProblem = () => {
    client.send('/api/algo/pass', {}, JSON.stringify({roomCode: InGameInfo.roomCode}))
  }

  return <>
    <h1>주사위는 던져졌다!!</h1>
    <button onClick={handleProgress}>select</button>
    <button onClick={handleProgress}>solve</button>
    <button onClick={handleLeaveRoom}>게임방에서 나가기</button>
    {progress === 'select' && <AlgoSelect problemList={problemList} passProblem={passProblem} problemIndex={problemIndex} />}
    {progress === 'solve' && <AlgoSolve />}
  </>
}
export default AlgoAfterStart