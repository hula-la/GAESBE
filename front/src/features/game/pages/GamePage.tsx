import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import FriendMainPage from '../../friend/pages/FriendMainPage';
import SideBar from '../../../components/Layout/SideBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #232323;
`;
const CombinePage = () => {
  return (
    <Wrapper>
      <SideBar />
      <Outlet />
      <FriendMainPage />
    </Wrapper>
  );
};

export default CombinePage;
