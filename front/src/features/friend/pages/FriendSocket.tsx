import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { friendActions } from '../friendSlice';
import { itemActions } from '../../game/itemSlice';

interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

function FriendSocket() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { chatFriend } = useSelector((state: any) => state.friend);
  const { sendContent } = useSelector((state: any) => state.friend);
  const { isChatOpen } = useSelector((state: any) => state.friend);
  const [msgId, setMsgId] = useState<any>(null);

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = useRef<any>(null);

  useEffect(() => {
    client.current = Stomp.over(socket);
    // 개발 버전에서만 콘솔 뜨게 하기
    if (process.env.NODE_ENV !== 'development') {
      client.current.debug = function () {};
    }
  }, []);

  // 최초 입장시 소켓 뚫고, 백준id보내기
  useEffect(() => {
    // 입장할때 소켓 뚫기
    client.current.connect({}, (frame: any) => {
      // 친구목록 메세지 받을 위치
      client.current.subscribe(`/friend/${userInfo.id}`, (res: any) => {
        var data = JSON.parse(res.body);
        if (data.hasOwnProperty('inviteGameType')) {
          dispatch(friendActions.invitedGame(data));
        } else if (data.hasOwnProperty('msg')) {
          if (data.from === userInfo.id) {
            dispatch(
              friendActions.recieveChat({
                chatItem: data,
                id: data.to,
                isChatOpen,
              }),
            );
          } else if (data.hasOwnProperty('character')) {
            alert(
              `${data.need}의 조건을 가진 캐릭터를 획득했습니다.(모달이나 스윗얼럿으로 바꾸면 사진 넣어줄거임)`,
            );
            dispatch(itemActions.fetchCharacterStart());
          } else {
            setMsgId(data.id);
            dispatch(
              friendActions.recieveChat({
                chatItem: data,
                id: data.from,
                isChatOpen,
              }),
            );
          }
        } else {
          dispatch(friendActions.setFriends(JSON.parse(res.body)));
        }
      });
      // 뚫었으니 들어갔다고 알리기
      client.current.send(
        '/api/friend/connect',
        {},
        JSON.stringify({
          sessionId: socket._transport.url.slice(-18, -10),
          userId: userInfo.id,
        }),
      );
      // 채팅 왓다고 알람 알려주기
      client.current.subscribe(`/chat/alarm/${userInfo.id}`, (res: any) => {
        var data = JSON.parse(res.body);
        dispatch(friendActions.fetchAlarmList(data));
      });
      // 확인 안 한 메세지 잇을 경우 띄워주기 위해 구독
      client.current.subscribe(`/friend/chat/${userInfo.id}`, (res: any) => {
        var data = JSON.parse(res.body);
        dispatch(friendActions.fetchWaitFriend(data));
      });
    });

    return () => {
      client.current.disconnect(() => {});
    };
  }, []);

  useEffect(() => {
    if (sendContent) {
      client.current.send(
        `/api/chat/send`,
        {},
        JSON.stringify({
          from: userInfo.id,
          to: chatFriend.id,
          msg: sendContent,
        }),
      );
      dispatch(friendActions.resetChat());
    }
  }, [sendContent]);

  useEffect(() => {
    if (msgId) {
      dispatch(friendActions.postChatStart({ msgIds: [msgId] }));
      setMsgId(null);
    }
  }, [msgId]);

  return <></>;
}
export default FriendSocket;
