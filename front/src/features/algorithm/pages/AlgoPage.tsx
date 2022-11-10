import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import AlgoInBattle from './AlgoInBattle'
import AlgoMainPage from './AlgoMainPage'
import AlgoRoomList from './AlgoRoomList'
import AlgoRoomMake from './AlgoRoomMake'
import styled from 'styled-components'

const AlgoPageDiv = styled.div`
  background-color: #232323;
  width: 82%;
  color: white;
`

function AlgoPage() {
  const {userInfo} = useSelector((state:any) => state.auth)
  return <AlgoPageDiv>
    {userInfo &&
      <Routes>
        <Route path="" element={<AlgoMainPage />} />
        <Route path="/make" element={<AlgoRoomMake />} />
        <Route path="/list" element={<AlgoRoomList />} />
        <Route path="/battle" element={<AlgoInBattle />} />
      </Routes>
    }
  </AlgoPageDiv>
}
export default AlgoPage