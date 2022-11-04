

function AlgoBeforeStart({ handleLeaveRoom }: any) {
  const handleStart = () => {
    console.log('게임 시작하기')
  }
  return <>
    <h1>시작 전 대기 방</h1>
    <button onClick={handleLeaveRoom}>대기방에서 나가기</button>
    <button onClick={handleStart}>배틀 시작하기</button>
  </>
}
export default AlgoBeforeStart