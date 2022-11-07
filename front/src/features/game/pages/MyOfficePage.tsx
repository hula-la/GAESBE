import React from 'react';
import styled from 'styled-components';
import Level0 from '../components/Level0';
import Level1 from '../components/Level1';
import Level2 from '../components/Level2';
import Level3 from '../components/Level3';
import Level4 from '../components/Level4';
import Level5 from '../components/Level5';
import Level6 from '../components/Level6';
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
      <Level0 />
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      {/* <Level3 /> */}
      {/* <Level4 /> */}
      {/* <Level5 /> */}
      {/* <Level6 /> */}
      <Friend>
        <FriendMainPage/>
      </Friend>
    </>
  );
};

export default MyOfficePage;
