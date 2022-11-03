import React from 'react';
import styled from 'styled-components';


const Home = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82%;
  // background-color: white;
  background-color: #232323;
  color: aqua;
`;
const MyRoomImg = styled.img`
  height: 100%;
`
const MyOfficePage = () => {
  const myLevel: number = 3
  // const myLevel: number = 1
  return (
    <Home>
      <MyRoomImg src={`/img/MyOffice/level${myLevel}.png`} alt="내 방" />
    </Home>
  );
};

export default MyOfficePage;