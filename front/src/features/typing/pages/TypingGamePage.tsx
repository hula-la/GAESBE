import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TypingGame from '../components/TypingGame';
import styled from 'styled-components';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

const LodingPage = styled.div`
  width: 82%;
  background-color: #232323;
`;
const TypingGameMain = styled.div`
  width: 82%;
  background-color: #232323;
  .title {
    text-align: center;
    height: 30%;
    img {
      height: 60%;
    }
  }
`;
function TypingGamePage() {
  const [isLoding, setIsLoding] = useState<Boolean>(true);
  const [roomInfo, setRoomInfo] = useState<any>();
  const { userInfo } = useSelector((state: any) => state.auth);
  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);
  // // console.log('asdfasdf', socket);
  // // 소켓 뚫고
  client.connect({}, (frame) => {
    client.send(
      '/typing/enter',
      {},
      JSON.stringify({
        lang: 'python',
        id: '4',
        nickName: '배준식',
        socketId: socket._transport.url.slice(-18, -10),
        roomCode: '',
        isCreat: false,
      }),
    );
    console.log('보냄?');
    client.subscribe('/topic/typing/4/enter', (res) => {
      // client.subscribe(`/typing/${userInfo.userId}/enter`, (res) => {
      console.log('메세지 옴 ');
      console.log('asdfasdfas', JSON.parse(res.body));
    });
    // console.log(client);
    // console.log('연결');
    // console.log(socket._transport.url.slice(-18, -10));
  });
  //   useEffect(() => {
  // });
  return (
    <>
      {isLoding && <LodingPage>zz</LodingPage>}
      {!isLoding && (
        <TypingGameMain>
          <div className="title">
            <img src="/img/gametitle/gametitle2.png" alt="title" />
          </div>
          <TypingGame />
        </TypingGameMain>
      )}
    </>
  );
}

export default TypingGamePage;
