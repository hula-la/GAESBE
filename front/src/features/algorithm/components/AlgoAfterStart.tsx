import { useState } from "react"
import { useSelector } from "react-redux"

import AlgoSelect from "./AlgoSelect"
import AlgoSolve from "./AlgoSolve"

import '../../../components/Common/retroBtn.css';
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
`

function AlgoAfterStart({ client, ranking, handleLeaveRoom, progress, problemList, problemIndex, inGameUsers, myRank, timeOut }: any) {
  const {InGameInfo} = useSelector((state:any) => state.algo)

  const [passDisabled, setPassDisabled] = useState<boolean>(false)

  const passProblem = () => {
    setPassDisabled(true)
    client.current.send('/api/algo/pass', {}, JSON.stringify({roomCode: InGameInfo.roomCode}))
  }

  return <Wrapper>
    <a onClick={handleLeaveRoom } className="eightbit-btn ">나가기</a>
    {progress === 'select' && <AlgoSelect inGameUsers={inGameUsers} passDisabled={passDisabled} problemList={problemList} passProblem={passProblem} problemIndex={problemIndex} />}
    {progress === 'solve' && <AlgoSolve timeOut={timeOut} myRank={myRank} inGameUsers={inGameUsers} client={client} ranking={ranking} problemList={problemList} problemIndex={problemIndex}  />}
  </Wrapper>
}
export default AlgoAfterStart