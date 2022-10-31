import { Routes, Route } from 'react-router-dom'
import AlgoInBattle from './pages/AlgoInBattle'
import AlgoMainPage from './pages/AlgoMainPage'
import AlgoRoomList from './pages/AlgoRoomList'
import AlgoRoomMake from './pages/AlgoRoomMake'

function AlgoPage() {
  return <>
    <Routes>
      <Route path="" element={<AlgoMainPage />} />
      <Route path="/make" element={<AlgoRoomMake />} />
      <Route path="/list" element={<AlgoRoomList />} />
      <Route path="/battle/*" element={<AlgoInBattle />} />
    </Routes>
  </>
}
export default AlgoPage