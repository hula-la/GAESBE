import { useState } from "react"
import { useSelector } from "react-redux"

import AlgoSelect from "./AlgoSelect"
import AlgoSolve from "./AlgoSolve"

function AlgoAfterStart({ client, handleLeaveRoom, progress, problemList, problemIndex }: any) {
  const {InGameInfo} = useSelector((state:any) => state.algo)

  const passProblem = () => {
    client.send('/api/algo/pass', {}, JSON.stringify({roomCode: InGameInfo.roomCode}))
  }

  return <>
    <h1>주사위는 던져졌다!!</h1>
    <button onClick={handleLeaveRoom}>게임방에서 나가기</button>
    {progress === 'select' && <AlgoSelect problemList={problemList} passProblem={passProblem} problemIndex={problemIndex} />}
    {progress === 'solve' && <AlgoSolve problemList={problemList} problemIndex={problemIndex}  />}
  </>
}
export default AlgoAfterStart