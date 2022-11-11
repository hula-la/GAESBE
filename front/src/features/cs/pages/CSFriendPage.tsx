import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;

const WaitingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .waitingroom {
    width: 100%;
    height: 100%;
  }
  .subtitle {
    font-size: 30px;
    font-weight: 400;
  }
  .waitingContent {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .imgBox {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .waitingCharacters {
  }
`;

const IngameBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  --duration: 5;

  .progressContainer .progress {
    animation: roundtime calc(var(--duration) * 1s) linear forwards;
    transform-origin: left center;
  }

  @keyframes roundtime {
    to {
      transform: scaleX(0);
    }
  }

  .progress {
    background: orange;
    height: 100%;
    /* width: 100%; */
    text-align: right;
    font: bold 12px arial;
    border-right: 1px silver solid;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    line-height: 30px;
    color: #444;
    /* -webkit-transition: width 5s linear; For Safari 3.1 to 6.0 */
    /* transition: width 5s linear; */
  }
  .progressContainer {
    width: 90%;
    margin: 0 auto;
    height: 30px;
    border: 1px silver solid;
    border-radius: 4px;
    background: white;
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
    .character {
      width: 30%;
      height: 30%;
    }
  }
  .character {
    width: 70%;
    height: 30%;
  }
`;

const CSFriendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isMaster, setIsMaster] = useState<Boolean>(false);
  const [isStart, setIsStart] = useState<Boolean>(false);
  const [roomCode, setRoomCode] = useState<string>('');
  const [players, setPlayers] = useState<any>(null);
  const [problem, setProblem] = useState<any>(null);
  const [isSolved, setIsSolved] = useState<Boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<Boolean | null>(null);
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);
  const [ranking, setRanking] = useState<any>(null);
  const [isNext, setIsNext] = useState<Boolean>(false);
  const [isEnd, setIsEnd] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [countArr, setCountArr] = useState<any>(null);
  const { userInfo } = useSelector((state: any) => state.auth);

  const { shareCode } = location.state;

  const initialTime = useRef<number>(5);
  const interval = useRef<any>(null);
  const [sec, setSec] = useState(5);
  let roomcode: string;
  let playerList: Array<any>;

  const characterLocationArr: any = [
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '18%',
      top: '52%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '22%',
      top: '48%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
    {
      position: 'absolute',
      width: '15%',
      height: '15%',
      left: '14%',
      top: '56%',
    },
  ];
  const characterCountArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  const client = Stomp.over(socket);
  // client.debug = () => {};

  const client2 = Stomp.over(socket);

  // 소켓 연결 후 구독 및 요청
  useEffect(() => {
    if (userInfo) {
      client.connect({}, (frame) => {
        // 내 개인 정보 구독
        client.subscribe(`/cs/${userInfo.id}`, (res) => {
          var data = JSON.parse(res.body);
          if (data.hasOwnProperty('room')) {
            setRoomCode(data.room);
            roomcode = data.room;
          } else if (data.hasOwnProperty('msg')) {
            if (data.msg === 'submit') {
              setIsSubmit(true);
            }
          } else if (data.hasOwnProperty('isSolved')) {
            setIsCorrect(data.isCorrect);
            setIsSolved(data.isSolved);
            setIsSubmit(false);
            setProblem('a');
            setTimeout(() => {
              setIsNext(true);
            }, 7000);
          } else if (data.hasOwnProperty('master')) {
            setIsMaster(true);
          } else {
            setIsCorrect(data.isCorrect);
          }
        });

        // 방에 들어가기
        const enterRoom = () => {
          client.send(
            '/api/cs',
            {},
            JSON.stringify({
              type: 'ENTER',
              sessionId: socket._transport.url.slice(-18, -10),
              userId: userInfo.id,
              roomType: 'FRIEND',
              roomCode: shareCode,
            }),
          );
        };
        enterRoom();

        // 들어오는 순간 방의 사람들 정보를 받음
        const fetchMemberInfo = () => {
          client.send(
            '/api/cs/memberInfo',
            {},
            JSON.stringify({
              roomCode: roomcode,
            }),
          );
        };
        setTimeout(() => {
          fetchMemberInfo();
        }, 2000);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (roomCode) {
      // 룸코드를 받으면 그 방에 대한 구독을 함
      client2.connect({}, (frame) => {
        client2.subscribe('/cs/room/' + roomCode, (res) => {
          var data1 = JSON.parse(res.body);
          if (data1.hasOwnProperty('msg')) {
            if (data1.msg === 'end') {
              setIsEnd(true);
              setResult(data1.result);
            } else {
              setIsStart(true);
            }
          } else if (data1.hasOwnProperty('currentProblem')) {
            setIsCorrect(null);
            setIsSolved(null);
            setProblem(data1.currentProblem);
            setIsNext(false);
          } else if (data1.hasOwnProperty('ranking')) {
            setRanking(data1.ranking);
          } else {
            if (!playerList) {
              for (let i = 0; i < data1.length; i++) {
                characterCountArr[i] = data1[i].id;
              }
              setCountArr(characterCountArr);
            } else if (playerList.length > data1.length) {
              const temp = playerList.filter((player: any) => {
                return !data1.some(
                  (dataItem: any) => player.id === dataItem.id,
                );
              });
              characterCountArr[characterCountArr.indexOf(temp[0].id)] = 0;
              setCountArr(characterCountArr);
            } else if (playerList.length < data1.length) {
              const temp = data1.filter((dataItem: any) => {
                return !playerList.some(
                  (player: any) => dataItem.id === player.id,
                );
              });
              characterCountArr[characterCountArr.indexOf(0)] = temp[0].id;
              setCountArr(characterCountArr);
            }
            setPlayers(data1);
            playerList = data1;
          }
        });
      });
    }
  }, [roomCode]);

  useEffect(() => {
    return () => {
      client.disconnect(() => {});
    };
  }, []);
  // 로딩 & 끝 제어
  useEffect(() => {
    if (players) {
      setIsLoading(false);
    }
    if (isEnd && result) {
      console.log('끝');
      navigate('/game/CS/result', { state: { result: result } });
    }
  }, [players, result, isEnd]);

  const onClickStart = () => {
    client.send(
      '/api/cs/start',
      {},
      JSON.stringify({
        roomCode: roomCode,
      }),
    );
  };

  // 정답 유무 확인
  const handleAnswerSend = () => {
    client.send(
      '/api/cs/submit',
      {},
      JSON.stringify({
        answer: '3',
        problemId: problem.id,
        userId: userInfo.id,
        roomCode: roomCode,
      }),
    );
  };

  return (
    <Container>
      {isLoading && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" alt="loadingSpinner" />
          <p className="loadingText">방에 들어가는중~</p>
        </LoadingBlock>
      )}
      {!isLoading && !isStart && (
        <WaitingBlock>
          <img
            src="/img/gametitle/gametitle3.png"
            className="gameTitle"
            alt="gameTitle"
          />
          <div className="subtitle">친선전</div>
          {isMaster && <button onClick={onClickStart}>게임시작</button>}
          {/* {isLast && <p>{sec}초 후 게임이 시작됩니다!</p>} */}
          <div className="waitingContent">
            <div className="imgBox">
              <img
                src="/img/rank/waitingroom.png"
                className="waitingroom"
                alt="room"
              />
              {players &&
                players.map((player: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      style={characterLocationArr[countArr.indexOf(player.id)]}
                    >
                      <div>{player.nickname}</div>
                      <img
                        style={{ height: '100%', width: '100%' }}
                        src={`${process.env.REACT_APP_S3_URL}/profile/${player.profileChar}_normal.gif`}
                        alt="character"
                      />
                    </div>
                  );
                })}
            </div>
            {players &&
              players.map((player: any, idx: number) => {
                return <li key={idx}>{player.nickname}</li>;
              })}
          </div>
        </WaitingBlock>
      )}
      {isStart && (
        <IngameBlock>
          <img
            src="/img/gametitle/gametitle3.png"
            className="gameTitle"
            alt="gameTitle"
          />
          {(!problem || isNext) && (
            <div>
              <img src="/img/loadingspinner.gif" alt="loadingSpinner" />
              <p className="loadingText">문제를 불러오고 있습니다</p>
            </div>
          )}
          {problem && !isSubmit && isCorrect === null && (
            <div className="problemBox">
              <div className="problem">
                <div className="progressContainer">
                  <div className="progress"></div>
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
                  alt="button"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/twobutton.png"
                  alt="button"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/threebutton.png"
                  alt="button"
                />
                <img
                  className="selectbutton"
                  onClick={handleAnswerSend}
                  src="/img/selectbutton/fourbutton.png"
                  alt="button"
                />
              </div>
              {ranking && (
                <div className="rankBlock">
                  <div className="rankwrapper">
                    <div>
                      <img src="/img/rank/goldmedal.png" alt="medal" />
                      {/* <img
                        alt='character
                        src={`${process.env.REACT_APP_S3_URL}/profile/${
                          Object.keys(ranking[0])[0]
                        }.png`}
                      /> */}
                      <div>
                        <img
                          alt="character"
                          className="character"
                          src={`${process.env.REACT_APP_S3_URL}/profile/0.png`}
                        />
                        <div>{ranking[0][1]}</div>
                        <div>{ranking[0][2]}</div>
                      </div>
                      {}
                    </div>
                  </div>
                  <div className="rankwrapper">
                    <div>
                      <img src="/img/rank/silvermedal.png" />
                      {/* <img
                        src={`${process.env.REACT_APP_S3_URL}/profile/${
                          Object.keys(ranking[0])[0]
                        }.png`}
                      /> */}
                      <div>
                        <img
                          className="character"
                          src={`${process.env.REACT_APP_S3_URL}/profile/0.png`}
                        />
                        <div>{ranking[1][1]}</div>
                        <div>{ranking[1][2]}</div>
                      </div>
                      {}
                    </div>
                  </div>
                  <div className="rankwrapper">
                    <div>
                      <img src="/img/rank/bronzemedal.png" />
                      {/* <img
                        src={`${process.env.REACT_APP_S3_URL}/profile/${
                          Object.keys(ranking[0])[0]
                        }.png`}
                      /> */}
                      {/* <div>
                        <img
                          className="character"
                          src={`${process.env.REACT_APP_S3_URL}/profile/0.png`}
                        />
                        <div>
                          {
                            players.filter((player: any) => {
                              return player.id == Object.keys(ranking[2])[0];
                            })[0].nickname
                          }
                        </div>
                        <div>{ranking[2][Object.keys(ranking[2])[0]]}</div>
                      </div> */}
                      {}
                    </div>
                  </div>
                  <div>
                    <img
                      className="character"
                      src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}.png`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {isSubmit && (
            <div>
              <img src="/img/loadingspinner.gif" />
              <p className="loadingText">다른 사람들이 푸는것을 기다려주세요</p>
            </div>
          )}
          {isCorrect !== null &&
            isSolved !== null &&
            problem === 'a' &&
            !isNext && (
              <div>
                <p>중간결과 페이지</p>
              </div>
            )}
        </IngameBlock>
      )}
    </Container>
  );
};

export default CSFriendPage;
