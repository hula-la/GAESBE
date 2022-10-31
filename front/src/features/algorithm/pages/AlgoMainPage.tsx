import { useNavigate } from "react-router-dom"
function AlgoMainPage() {
  const navigate = useNavigate()

  const handleMakeRoom = () => {
    navigate("make")
  }

  const handleRoomList = () => {
    navigate("list")
  }

  return <>
    <h1>알고 배틀 메인 페이지</h1>
    <button onClick={handleMakeRoom}>방만들기</button>
    <button onClick={handleRoomList}>방 목록 확인하기</button>
  </>
}
export default AlgoMainPage