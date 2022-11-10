import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { friendActions } from '../friendSlice';

interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

function FriendSocket() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);
  // 개발 버전에서만 콘솔 뜨게 하기
  if (process.env.NODE_ENV !== 'development') {
    client.debug = function () {};
  }
  // 최초 입장시 소켓 뚫고, 백준id보내기
  useEffect(() => {
    // 입장할때 소켓 뚫기
    client.connect({}, (frame) => {
      // 친구목록 메세지 받을 위치
      client.subscribe(`/friend/${userInfo.id}`, (res) => {
        dispatch(friendActions.setFriends(JSON.parse(res.body)));
      });
      // 뚫었으니 들어갔다고 알리기
      client.send(
        '/api/friend/connect',
        {},
        JSON.stringify({
          sessionId: socket._transport.url.slice(-18, -10),
          userId: userInfo.id,
        }),
      );
    });
    return () => {
      client.disconnect(() => {});
    };
  }, []);

  return <></>;
}
export default FriendSocket;
