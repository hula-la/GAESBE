import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import AlgoInBattle from './AlgoInBattle'
import AlgoMainPage from './AlgoMainPage'
import AlgoRoomMake from './AlgoRoomMake'
import styled from 'styled-components'

const AlgoPageDiv = styled.div`
  background-color: #232323;
  height: 100%;
  width: 100%;
  color: white;
`

function AlgoPage() {
  const {userInfo} = useSelector((state:any) => state.auth)
  return <AlgoPageDiv>
    {userInfo &&
      <Routes>
        <Route path="" element={<AlgoMainPage />} />
        <Route path="/make" element={<AlgoRoomMake />} />
        <Route path="/battle" element={<AlgoInBattle />} />
      </Routes>
    }
  </AlgoPageDiv>
}
export default AlgoPage