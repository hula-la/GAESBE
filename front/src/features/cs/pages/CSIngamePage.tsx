import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

const CSIngamePage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [roomcode, setRoomCode] = useState<any>(null);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { roomType } = location.state;

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);

  client.connect({}, (frame) => {
    console.log('연결 완료');
    client.subscribe(`/cs/${userInfo.id}`, (res) => {
      console.log('나한테 소켓 통신 옴~');
      console.log(JSON.parse(res.body));
      const data = JSON.parse(res.body);
      setRoomCode(data.room);
    });
    enterRoom();
  });

  const enterRoom = () => {
    client.send(
      'api/cs',
      {},
      JSON.stringify({
        type: 'ENTER',
        sessionId: socket._transport.url.slice(-18, -10),
        userId: userInfo.id,
        roomType: roomType,
      }),
    );
  };

  useEffect(() => {
    if (roomcode !== null) {
      setIsLoading(false);
    }
  }, [roomcode]);

  return (
    <div>
      {isLoading && <p>로딩중</p>}
      {!isLoading && <p>CS 인게임 페이지</p>}
    </div>
  );
};

export default CSIngamePage;
