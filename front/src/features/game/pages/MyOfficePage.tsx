import React from 'react';
import styled from 'styled-components';
import Level1 from '../components/Level1';
import Level2 from '../components/Level2';
import Level3 from '../components/Level3';
import FriendMainPage from '../../friend/pages/FreindMainPage';


const Friend = styled.div`
  width: 21.75%;
  background-color: #232323;
  border: 2px solid red;
  color: white;
`;
const MyOfficePage = () => {

  return (
    <>
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      <Level3 />
      <Friend>
        <FriendMainPage/>
      </Friend>
    </>
  );
};

export default MyOfficePage;
