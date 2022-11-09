import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { algoActions } from '../algorithmSlice';
import { bojUserIdRequest } from '../../../api/algoApi';
import { usePrompt } from '../../../utils/block';
import { InGameUsersInterface, ProblemInterface } from '../../../models/algo';

import AlgoBeforeStart from '../components/AlgoBeforeStart';
import AlgoAfterStart from '../components/AlgoAfterStart';

interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

function AlgoInBattle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inGameUsers, setInGameUsers] = useState<InGameUsersInterface[]>([]);
  const [progress, setProgress] = useState<string>('before');
  const [afterProgress, setAfterProgress] = useState<string>('select');
  const [problemList, setProblemList] = useState<ProblemInterface[]>([]);
  const [problemIndex, setProblemIndex] = useState<number>(0);

  const { InGameInfo } = useSelector((state: any) => state.algo);
  const { userInfo } = useSelector((state: any) => state.auth);

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);

  // 최초 입장시 소켓 뚫고, 백준id보내기
  useEffect(() => {
    // 입장할때 소켓 뚫기
    client.connect({}, (frame) => {
      console.log(frame);
      // 입장, 퇴장 관련 메세지 받을 위치
      client.subscribe(`/algo/room/${InGameInfo.roomCode}`, (res) => {
        setInGameUsers(JSON.parse(res.body).users);
        const newGameInfo = JSON.parse(JSON.stringify(InGameInfo));
        newGameInfo.master = JSON.parse(res.body).master;
        dispatch(algoActions.enterAlgoRoomSuccess(newGameInfo));
      });

      // 문제 선택 시작 메세지 받을 위치
      client.subscribe(`/algo/start/pass/${InGameInfo.roomCode}`, (res) => {
        console.log(JSON.parse(res.body));
        setProblemList(JSON.parse(res.body).problems);
        if (InGameInfo.master == userInfo.id) {
          client.send(
            `/api/algo/timer`,
            {},
            JSON.stringify({ roomCode: InGameInfo.roomCode }),
          );
        }
        setProgress('after');
      });

      // 문제 패스 메세지 받기
      client.subscribe(`/algo/pass/${InGameInfo.roomCode}`, (res: any) => {
        setProblemIndex(JSON.parse(res.body).no);
        if (InGameInfo.master == userInfo.id) {
          client.send(
            `/api/algo/timer`,
            {},
            JSON.stringify({ roomCode: InGameInfo.roomCode }),
          );
        }
      });

      // 문제 시작 메세지 받기
      client.subscribe(`/algo/problem/${InGameInfo.roomCode}`, (res: any) => {
        setProblemIndex(JSON.parse(res.body).no);
        setAfterProgress('solve');
        console.log('문제 시작한다는');
        console.log(JSON.parse(res.body));
      });

      // 뚫었으니 들어갔다고 알리기
      client.send(
        '/api/algo',
        {},
        JSON.stringify({
          type: 'ENTER',
          sessionId: socket._transport.url.slice(-18, -10),
          userId: userInfo.id,
          roomCode: InGameInfo.roomCode,
        }),
      );
    });
    // 백준 크롤링 하세요, 방번호 백준아이디
    bojUserIdRequest(InGameInfo.roomCode, userInfo.bjId);
    return () => {
      leaveRoom();
    };
  }, []);

  // 뒤로가기 막는 useEffect
  useEffect(() => {
    const preventGoBack = () => {
      // change start
      window.history.pushState(null, '', window.location.href);
      // change end
      alert('게임중에는 나갈 수 없습니다');
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);
  // 뒤로가기 막는 useEffect
  // 새로고침, 창닫기, 사이드바 클릭 등으로 페이지 벗어날때 confirm 띄우기
  usePrompt('게임에서 기권패배 될 수 있습니다', true);
  // 새로고침, 창닫기, 사이드바 클릭 등으로 페이지 벗어날때 confirm 띄우기

  // 방 떠나기
  const leaveRoom = async () => {
    // 소켓 끊고
    await client.disconnect(() => {});
    // 스토어의 방 정보 비우기
    await dispatch(algoActions.exitAlgoRoom());
  };
  // 방 떠나기 끝

  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML);
  };

  const handleLeaveRoom = async () => {
    navigate('/game/algo/list');
  };

  // 내가 방장이다 게임 시작할거다
  const startGame = () => {
    const userBjIds = inGameUsers.map((user: InGameUsersInterface) => {
      return user.bjId;
    });
    client.send(
      `/api/algo/start/pass`,
      {},
      JSON.stringify({
        tier: InGameInfo.tier,
        roomCode: InGameInfo.roomCode,
        users: userBjIds,
      }),
    );
  };

  return (
    <>
      <h1>알고리즘 배틀 페이지</h1>
      <button onClick={handleProgress}>before</button>
      <button onClick={handleProgress}>after</button>
      {progress === 'before' && (
        <AlgoBeforeStart
          handleLeaveRoom={handleLeaveRoom}
          startGame={startGame}
          inGameUsers={inGameUsers}
        />
      )}
      {progress === 'after' && (
        <AlgoAfterStart
          handleLeaveRoom={handleLeaveRoom}
          progress={afterProgress}
          client={client}
          problemList={problemList}
          problemIndex={problemIndex}
        />
      )}
    </>
  );
}
export default AlgoInBattle;
