import { Routes, Route } from 'react-router-dom'
import AlgoInBattle from './pages/AlgoInBattle'
import AlgoMainPage from './pages/AlgoMainPage'
import AlgoRoomList from './pages/AlgoRoomList'
import AlgoRoomMake from './pages/AlgoRoomMake'
import styled from 'styled-components'

const AlgoPageDiv = styled.div`
  background-color: #232323;
  width: 82%;
  color: white;
`

function AlgoPage() {
  return <AlgoPageDiv>
    <Routes>
      <Route path="" element={<AlgoMainPage />} />
      <Route path="/make" element={<AlgoRoomMake />} />
      <Route path="/list" element={<AlgoRoomList />} />
      <Route path="/battle" element={<AlgoInBattle />} />
    </Routes>
  </AlgoPageDiv>
}
export default AlgoPage