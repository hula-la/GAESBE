

function AlgoBeforeStart({ handleLeaveRoom }: any) {

  return <>
    <h1>시작 전 대기 방</h1>
    <button onClick={handleLeaveRoom}>대기방에서 나가기</button>
  </>
}
export default AlgoBeforeStart