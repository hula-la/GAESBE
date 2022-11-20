import React, { useEffect, useState } from 'react';
import TypingFriendGame from '../components/TypingFriendGame';
import styled from 'styled-components';
const Container = styled.div`
  /* width: 82%; */
  background-color: #232323;
  justify-content: center;
  /* text-align: center; */
  color: white;
  .title {
    text-align: center;
    height: 25%;
    img {
      height: 80%;
    }
  }
`;

const TypingGameMain = styled.div`
  background-color: #232323;
  .title {
    text-align: center;
    height: 30%;
    img {
      height: 30%;
    }
  }
`;
function TypingFriendGamePage() {
  return (
    <Container>
      {/* <div className="title"> */}
        {/* <img src="/img/gametitle/gametitle2.png" alt="title" /> */}
        {/* 여기가 친구 페이지 */}
      {/* </div> */}
      <TypingFriendGame />
    </Container>
  );
}

export default TypingFriendGamePage;
