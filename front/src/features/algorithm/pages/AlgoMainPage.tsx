import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AlgoRooms from './AlgoRooms';
import AlgoNav from '../components/AlgoNav';
import Algo1 from './Algo1';
import Algo2 from './Algo2';

function AlgoMainPage() {
  return <>
    <h1>알고 배틀 메인페이지</h1>
    <AlgoNav />
    <Routes>
      <Route path="" element={<AlgoRooms />} />
      <Route path="/1" element={<Algo1 />} />
      <Route path="/2" element={<Algo2 />} />
    </Routes>
  </>
}

export default AlgoMainPage