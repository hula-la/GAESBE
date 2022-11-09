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
  color: #ffffff;
  font-family: 'NeoDunggeunmo';
  font-style: normal;
  .gameTitle {
    margin-top: 1rem;
    height: 10%;
    width: 20%;
  }
`;
const LoadingBlock = styled.div`
  display: flex;
  /* border: 2px solid red; */
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
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
  let roomcode: string;
  let roomno: string;
  const location = useLocation();
  const { lang } = location.state;
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [roomCode, setRoomCode] = useState<string>('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const [roomNo, setRoomNo] = useState<string>('');
  // const socket: CustomWebSocket = new SockJS(
  //   'https://k7e104.p.ssafy.io:8081/api/ws',
  // );
  // const client = Stomp.over(socket);
  // const client2 = Stomp.over(socket);
  // useEffect(() => {
  //   if (userInfo) {
  //     client.connect({}, (frame) => {
  //       // client.subscribe(`/cs/${userInfo.id}`, (res) => {
  //       client.subscribe(`/typing2/${userInfo.id}`, (res) => {
  //         var data = JSON.parse(res.body);
  //         if (data.hasOwnProperty('room')) {
  //           setRoomCode(data.room);
  //           roomcode = data.room;
  //         }
  //         if (data.hasOwnProperty('isLast')) {
  //           if (data.isLast === true) {
  //             client.send(
  //               '/api/typing2/start',
  //               {},
  //               JSON.stringify({ roomCode: roomcode }),
  //             );
  //           }
  //         }
  //         console.log('첫구독', res);
  //       });
  //       const enterRoom = () => {
  //         client.send(
  //           // '/api/cs',
  //           '/api/typing2',
  //           {},
  //           JSON.stringify({
  //             langType: lang,
  //             type: 'ENTER',
  //             sessionId: socket._transport.url.slice(-18, -10),
  //             userId: userInfo.id,
  //             roomType: 'RANDOM',
  //           }),
  //         );
  //       };
  //       enterRoom();
  //       const fetchMemberInfo = () => {
  //         client.send(
  //           '/api/typing2/memberInfo',
  //           {},
  //           JSON.stringify({
  //             roomCode: roomcode,
  //           }),
  //         );
  //       };
  //       setTimeout(() => {
  //         fetchMemberInfo();
  //       }, 2000);
  //     });
  //   }
  // }, [userInfo]);

  // useEffect(() => {
  //   if (roomCode) {
  //     client2.connect({}, (frame) => {
  //       client2.subscribe('/typing2/room/' + roomCode, (res) => {
  //         console.log('클라이언트 2 결과', res.body);
  //       });
  //     });
  //   }
  // }, [roomCode]);

  //////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (userInfo) {
  //     client.connect({}, (frame) => {
  //       client.subscribe(`/topic/typing/${userInfo.id}/enter`, (res) => {
  //         console.log('여기가 처음 구독', res.body);
  //         console.log('여기가 처음 구독', JSON.parse(res.body).users.length);
  //         var data = JSON.parse(res.body);
  //         if (data.roomNo) {
  //           console.log('있나?');
  //         }
  //         if (data.hasOwnProperty('roomNo')) {
  //           setRoomNo(data.roomNo);
  //           roomno = data.roomNo;
  //           console.log(roomno);
  //         } else {
  //           console.log('업다');
  //         }
  //       });
  //       client.send(
  //         '/api/typing/enter',
  //         {},
  //         JSON.stringify({
  //           lang: lang,
  //           id: userInfo.id,
  //           nickName: userInfo.nickname,
  //           socketId: socket._transport.url.slice(-18, -10),
  //           roomCode: null,
  //           isCreat: false,
  //         }),
  //       );
  //       // client.subscribe(`/topic/typing/${roomno}/userList`, (res) => {
  //       //   console.log('asdfasdfasdfasd', res);
  //       // });
  //       setTimeout(() => {
  //         // client.subscribe('/topic/typing/1/userList', (res) => {
  //         // 방 유저 정보 가져오기
  //         client.subscribe(`/topic/typing/${roomno}/userList`, (res) => {
  //           console.log('asdfasdfasdfasd', res);
  //           console.log('asdfasdfasdfasd', JSON.parse(res.body).length);
  //           // 그 4명이면 게임 시작하자
  //           if (JSON.parse(res.body).length === 2) {
  //             client.subscribe(`/topic/typing/${roomno}/start`, (res) => {
  //               // 이 res에는 우리가 쳐야 할 문단이 있다.
  //               // 요거를 prop해서 게임컴포넌트에 넘겨줌
  //               console.log('게임시작??');
  //               console.log(res);
  //             });
  //             // 로딩 끝나는걸로 바꿔줌
  //             setIsLoading(false);
  //           }
  //         });
  //       }, 2000);
  //     });
  //   }
  //   // leaveRoom();
  //   // console.log('나감');
  // }, []);

  return (
    <Container>
      {!isLoading && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" />
          <p className="loadingText">랜덤 매칭중~</p>
        </LoadingBlock>
      )}
      {isLoading && (
        <TypingGameMain>
          <div className="title">
            <img src="/img/gametitle/gametitle2.png" alt="title" />
          </div>
          <TypingGame />
        </TypingGameMain>
      )}
      {/* <TypingGameMain>
        <div className="title">
          <img src="/img/gametitle/gametitle2.png" alt="title" />
        </div>
        <TypingGame />
      </TypingGameMain> */}
    </Container>
  );
}

export default TypingGamePage;
