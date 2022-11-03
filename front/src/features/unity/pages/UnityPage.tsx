import React from 'react';
import styled from 'styled-components';
import Level1 from '../components/Level1';
import Level2 from '../components/Level2';
import Level3 from '../components/Level3';

const Friend = styled.div`
  width: 21.75%;
  background-color: #232323;
  border: 2px solid red;
  color: white;
`;
const UnityPage = () => {
  return (
    <>
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      <Level3 />
      <Friend>
        <div>친구든 뭐든 있는 부분</div>
      </Friend>
    </>
  );
};

export default UnityPage;
