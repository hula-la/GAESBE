import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import FriendMainPage from '../../friend/pages/FriendMainPage';
import SideBar from '../../../components/Layout/SideBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #232323;
  overflow: hidden;

  .outlet{
    width: 64vw;
  }
`;

const CombinePage = () => {
  return (
    <Wrapper>
      <SideBar />
      <div className='outlet'>
      <Outlet />

      </div>
      <FriendMainPage />
    </Wrapper>
  );
};

export default CombinePage;
