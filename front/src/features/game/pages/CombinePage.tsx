import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../../../components/Layout/SideBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const CombinePage = () => {
  return (
    <Wrapper>
      <SideBar />
      <Outlet />
    </Wrapper>
  );
};

export default CombinePage;
