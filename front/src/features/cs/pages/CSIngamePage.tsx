import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';

interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

const Container = styled.div`
  width: 82%;
  background-color: #232323;
  color: #ffffff;
  .gameTitle {
    margin-top: 1rem;
    height: 10%;
    width: 20%;
  }
`;

const LoadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;

const WaitingBlock = styled.div``;

const IngameBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .timeProgress {
    height: 1rem;
    width: 100%;
    background-color: gray;
    &-progress {
      height: 100%;
      background-color: blue;
    }
  }
  .problemBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .problem {
    box-sizing: border-box;
    width: 60%;
    height: 45%;
    background: #ffffff;
    border: 5px solid #000000;
    box-shadow: 5px 5px 0px 4px #000000, 4px 4px 0px 7px #ffffff;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    .question {
      margin-top: 2rem;
      font-size: larger;
      font-weight: bold;
    }
  }
  .selectbuttons {
    display: flex;
    width: 60%;
    margin-top: 1rem;
    justify-content: space-between;
  }
  .selectbutton {
    cursor: pointer;
  }
  .rankBlock {
    margin-top: 1rem;
    display: flex;
  }
  .rankwrapper {
    margin-right: 1rem;
  }
`;

const CSIngamePage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isStart, setIsStart] = useState<Boolean>(false);
  const [roomCode, setRoomCode] = useState<string>('');
  const [players, setPlayers] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  const [problem, setProblem] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<string>('');
  const [isCorrectLoading, setIsCorrectLoading] = useState<Boolean>(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { roomType } = location.state;

  let roomcode: string;

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);
  // client.debug = () => {};

  useEffect(() => {
    if (userInfo) {
      client.connect({}, (frame) => {
        client.subscribe(`/cs/${userInfo.id}`, (res) => {
          var data = JSON.parse(res.body);
          if (data.hasOwnProperty('room')) {
            setRoomCode(data.room);
            roomcode = data.room;
          } else {
            setIsCorrect(data.result);
          }
        });

        const enterRoom = () => {
          client.send(
            '/api/cs',
            {},
            JSON.stringify({
              type: 'ENTER',
              sessionId: socket._transport.url.slice(-18, -10),
              userId: userInfo.id,
              roomType: roomType,
            }),
          );
        };
        enterRoom();
        setTimeout(() => {
          client.subscribe('/cs/room/' + roomcode, (res) => {
            console.log(JSON.parse(res.body));
            var data1 = JSON.parse(res.body);
            if (data1.hasOwnProperty('msg')) {
              setMessage(data1.msg);
              if (data1.hasOwnProperty('players')) {
                setPlayers(data1.players);
              }
            } else {
              setProblem(data1.currentProblem);
              setIsCorrectLoading(false);
            }
          });
        }, 2000);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (message) {
      setIsLoading(false);
    }
    if (message === 'start' && !isStart) {
      setIsStart(true);
    }
  }, [message]);

  const handleAnswerSend = () => {
    client.send(
      '/api/submit',
      {},
      JSON.stringify({
        answer: '3',
        problemId: problem.id,
        userId: userInfo.id,
        roomCode: roomCode,
      }),
    );
    setIsCorrectLoading(true);
  };

  return (
    <Container>
      {isLoading && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" />
          <p className="loadingText">랜덤 매칭중~</p>
        </LoadingBlock>
      )}
      {!isLoading && !isStart && (
        <WaitingBlock>
          <img src="/img/gametitle/gametitle3.png" className="gameTitle" />
          {players &&
            players.map((player: any, idx: number) => {
              return <li key={idx}>{player.nickname}</li>;
            })}
        </WaitingBlock>
      )}
      {isStart && (
        <IngameBlock>
          <img src="/img/gametitle/gametitle3.png" className="gameTitle" />
          {problem && !isCorrectLoading && (
            <div className="problemBox">
              <div className="problem">
                <div className="timeProgress">
                  <div
                    className="timeProgress-progress"
                    style={{ width: 30 + '%' }}
                  ></div>
                </div>
                <div className="question">{problem.question}</div>
                <div>{problem.example}</div>
                {/* {problem.examples.map((example: string, index: number) => {
                return (
                  <span>
                  {index} : {example}
                  </span>
                  );
                })} */}
              </div>
              <div className="selectbuttons">
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/onebutton.png"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/twobutton.png"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/threebutton.png"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/fourbutton.png"
                />
              </div>
              <div className="rankBlock">
                <div className="rankwrapper">
                  <img src="/img/rank/goldmedal.png" />
                  <img src="/img/rank/character1.png" />
                </div>
                <div className="rankwrapper">
                  <img src="/img/rank/silvermedal.png" />
                  <img src="/img/rank/character2.png" />
                </div>
                <div className="rankwrapper">
                  <img src="/img/rank/bronzemedal.png" />
                  <img src="/img/rank/character3.png" />
                </div>
                <div>
                  <img src="/img/rank/character4.png" />
                </div>
              </div>
            </div>
          )}

          {isCorrectLoading && <div>{isCorrect}</div>}
        </IngameBlock>
      )}
    </Container>
  );
};

export default CSIngamePage;
