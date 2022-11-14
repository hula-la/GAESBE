import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TypingGame from '../components/TypingGame';
import styled from 'styled-components';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
interface CustomWebSocket extends WebSocket {
  _transport?: any;
}
const Container = styled.div`
  width: 82%;
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
function TypingGamePage() {
  return (
    <Container>
      {/* <div className="title">
        <img src="/img/gametitle/gametitle2.png" alt="title" />
      </div> */}
      <TypingGame />
    </Container>
  );
}

export default TypingGamePage;
