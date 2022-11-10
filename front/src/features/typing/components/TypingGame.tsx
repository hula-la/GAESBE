import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './style.css';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

interface CharStateType {
  index: number;
  sentence: number;
  type: number;
}

const LoadingBlock = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;
const TypingPersonalResult = styled.div`
  /* border: 2px solid;
  border-radius: 5px; */
  width: 100%;
  color: white;
  height: 7vh;
  margin-bottom: 1px;
`;
const Personal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const PersonalId = styled.div`
  width: 15%;
  height: 7vh;
  /* border: 2px solid blue; */
  border: 2px solid white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PersonalCharacter = styled.div`
  width: 70%;
  height: 7vh;
  /* border: 2px solid red; */
  border: 2px solid white;
  border-radius: 5px;
`;
const CharacterImg = styled('img')<{ progress: string }>`
  padding-left: ${(props) => props.progress};
  height: 90%;
`;
const PersonalResult = styled.div`
  width: 15%;
  height: 7vh;
  border-radius: 5px;
  border: 2px solid white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Typing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TypingResult = styled.div`
  width: 90%;
  color: white;
  margin-bottom: 3rem;
`;
const WaitingTypingGameBox = styled.div`
  width: 90%;
  height: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  border-radius: 20px;
`;
const TypingGameBox = styled.div`
  width: 90%;
  background-color: white;
  padding-left: 1rem;
  padding-top: 1rem;
  height: 17rem;
  border-radius: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15px;
    border-radius: 70px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: gray;
  }
`;
const Wow = styled.div`
  display: inline;
  h1 {
    display: inline;
    div {
      height: 10rem;
      display: inline;
    }
  }
`;
const This = styled.div`
  display: inline;
  color: ${(props) => props.color};
`;
const TypingGame = () => {
  let roomcode: string;
  let testtest: number;
  let testprogress: any;
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = location.state;
  const [players, setPlayers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [roomCode, setRoomCode] = useState<string>('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const [testProgress, setTestProgress] = useState<any>(null);
  const [paragraph, setPargraph] = useState<any>(null);
  const [isReady, setIsReady] = useState<Boolean>(false);
  const [isEnd, setIsEnd] = useState<Boolean>(false);
  const [resultId, setResultId] = useState<any>(null);
  const [resultNickName, setResultNickName] = useState<any>(null);
  const [resultProfile, setResultProfile] = useState<any>(null);
  const initialTime = useRef<number>(3);
  const interval = useRef<any>(null);
  const [sec, setSec] = useState(3);

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );

  const client = Stomp.over(socket);
  const client2 = Stomp.over(socket);
  useEffect(() => {
    if (isEnd && resultId && resultNickName && resultProfile) {
      console.log('끄읕');
      navigate('/game/typing/result', {
        state: {
          resultId: resultId,
          resultNickName: resultNickName,
          resultProfile: resultProfile,
        },
      });
    }
  }, [isEnd, resultId, resultNickName, resultProfile]);
  useEffect(() => {
    if (isReady) {
      interval.current = setInterval(() => {
        setSec(initialTime.current % 60);
        initialTime.current -= 1;
      }, 1000);
      return () => clearInterval(interval.current);
    }
  }, [isReady]);
  useEffect(() => {
    if (userInfo) {
      client.connect({}, (frame) => {
        console.log('*****************121**************************');
        client.subscribe(`/typing2/${userInfo.id}`, (res) => {
          var data = JSON.parse(res.body);
          if (data.hasOwnProperty('room')) {
            setRoomCode(data.room);
            roomcode = data.room;
          }
          if (data.hasOwnProperty('isLast')) {
            if (data.isLast === true) {
              client.send(
                '/api/typing2/start',
                {},
                JSON.stringify({
                  langType: lang,
                  roomCode: roomcode,
                }),
              );
              setIsReady(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 5000);
            }
          }
        });
        const enterRoom = () => {
          client.send(
            '/api/typing2',
            {},
            JSON.stringify({
              langType: lang,
              type: 'ENTER',
              sessionId: socket._transport.url.slice(-18, -10),
              userId: userInfo.id,
              roomType: 'RANDOM',
            }),
          );
        };
        enterRoom();
        const fetchMemberInfo = () => {
          client.send(
            '/api/typing2/memberInfo',
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
      client2.connect({}, (frame) => {
        console.log('*****************177**************************');
        client2.subscribe('/typing2/room/' + roomCode, (res) => {
          var testdata = JSON.parse(res.body);
          if (testdata.hasOwnProperty('progressByPlayer')) {
            setTest(testdata.progressByPlayer[`${userInfo.id}`]);
            setTestProgress(testdata);
            testprogress = testdata.progressByPlayer;
            testtest = testdata.progressByPlayer[`${userInfo.id}`];
          } else if (testdata.hasOwnProperty('msg')) {
            if (testdata.msg === 'start') {
              setIsReady(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 5000);
            } else if (testdata.msg === 'end') {
              setResultId(testdata.winUserId);
              setResultNickName(testdata.winUserNickName);
              setResultProfile(testdata.winUserProfile);
              setIsEnd(true);
            }
          } else if (testdata.hasOwnProperty('paragraph')) {
            setPargraph(testdata.paragraph);
          } else if (testdata.hasOwnProperty('roomDto')) {
            return;
          } else {
            setPlayers(testdata);
          }
        });
      });
    }
  }, [roomCode]);

  function waitForConnection(client: any, callback: any) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (client.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(client, callback);
        }
      },
      1, // 밀리초 간격으로 실행
    );
  }
  // const example = [
  //   'xˇ=ˇint(input())',
  //   'ifˇxˇ<ˇ0:',
  //   'ˇˇˇˇxˇ=ˇ0',
  //   "ˇˇˇˇprint('Negativeˇchangedˇtoˇzero')",
  //   'elifˇxˇ==ˇ0:',
  //   "ˇˇˇˇprint('Zero')",
  //   'elifˇxˇ==ˇ1:',
  //   "ˇˇˇˇprint('Single')",
  //   'else:',
  //   "ˇˇˇˇprint('More')",
  // ];
  const exapmleitem = `${paragraph}`;
  const example = exapmleitem.split(' ');
  const item = example.map((e) => e);
  let totalLength = 0;
  item.map((e) => (totalLength += e.length));
  const [charState, setCharState] = useState<CharStateType>({
    index: 0,
    sentence: 0,
    type: 0,
  });
  const [progress, setProgress] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [sentence, setSentence] = useState<number>(0);
  const [endGame, setEndGame] = useState<number>(0);
  const [test, setTest] = useState<number>(0);

  const handleSetKey = (event: any) => {
    if (event.keyCode === 32) {
      event.preventDefault();
      //기능구현
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
    } else if (event.key === ' ') {
      if (example[sentence][index] === 'ˇ') {
        console.log('****************보냄********************');
        waitForConnection(client, function () {
          client.send(
            '/api/typing2/submit',
            {},
            JSON.stringify({
              roomCode: roomCode,
              sessionId: socket._transport.url.slice(-18, -10),
              isCorrect: true,
              userId: userInfo.id,
            }),
          );
        });
        setProgress(progress + 1);
        setIndex(index + 1);
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 1 }),
        );
        setCharState(changedState);
      } else {
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 2 }),
        );
        setCharState(changedState);
      }
    } else if (event.key === 'Enter') {
      // window.scrollBy(0, 1000);
      if (index === example[sentence].length) {
        const changedState = JSON.parse(
          JSON.stringify({ index: 0, sentence: sentence + 1, type: 0 }),
        );
        setCharState(changedState);
        setSentence(sentence + 1);
        setIndex(0);
      } else {
        event.preventDefault();
      }
    } else if (
      event.key !== 'Enter' &&
      event.key !== 'Shift' &&
      event.key !== 'Alt' &&
      event.key !== 'Control' &&
      event.key !== 'CapsLock' &&
      event.key !== 'F12' &&
      event.key !== 'F5' &&
      event.key !== 'Tab' &&
      event.key !== 'Meta' &&
      event.key !== 'HanjaMode' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp'
    ) {
      // 백에 보내는 맞고 틀리고는 무조건 인덱스당 한번만

      // 내가 친거랑 쳐야하는게 똑같다면
      if (example[sentence][index] === event.key) {
        console.log('****************보냄********************');
        waitForConnection(client, function () {
          client.send(
            '/api/typing2/submit',
            {},
            JSON.stringify({
              roomCode: roomCode,
              sessionId: socket._transport.url.slice(-18, -10),
              isCorrect: true,
              userId: userInfo.id,
            }),
          );
        });

        setProgress(progress + 1);
        setIndex(index + 1);
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 1 }),
        );
        setCharState(changedState);

        // 틀렸다면
      } else {
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 2 }),
        );
        setCharState(changedState);
      }
    } else {
    }
  };
  return (
    <div>
      {isLoading && !players && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" />
          <p className="loadingText">랜덤 매칭중~</p>
        </LoadingBlock>
      )}
      {isLoading && players && (
        <Typing>
          <TypingResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                '%'
                              : '0%'
                          }
                          className="img"
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                '%'
                              : '0%'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                'px'
                              : '0vw'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                'px'
                              : '0vw'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
          </TypingResult>

          <WaitingTypingGameBox>
            {!isReady && <p>4명의 인원이 모이면 시작합니다</p>}
            {isReady && <p>{sec}초 후 게임이 시작됩니다!</p>}
          </WaitingTypingGameBox>
        </Typing>
      )}
      {!isLoading && (
        <Typing>
          <TypingResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                '%'
                              : '0%'
                          }
                          className="img"
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 0 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                '%'
                              : '0%'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 1 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                'px'
                              : '0vw'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 2 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
            <TypingPersonalResult>
              <Personal>
                <PersonalId>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 ? <div>{player.nickname}</div> : null;
                    })}
                </PersonalId>
                <PersonalCharacter>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 ? (
                        <CharacterImg
                          progress={
                            testProgress
                              ? testProgress.progressByPlayer[`${player.id}`] +
                                'px'
                              : '0vw'
                          }
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      ) : null;
                    })}
                </PersonalCharacter>
                <PersonalResult>
                  {players &&
                    players.map((player: any, idx: any) => {
                      return idx === 3 && testProgress ? (
                        <div>
                          {testProgress.progressByPlayer[`${player.id}`]}
                        </div>
                      ) : null;
                    })}
                </PersonalResult>
              </Personal>
            </TypingPersonalResult>
          </TypingResult>

          <TypingGameBox
            onKeyDown={(event) => handleSetKey(event)}
            tabIndex={1}
          >
            {item.map((e, idx) => {
              return (
                <div>
                  {e.split('').map((char: string, index: number) => {
                    let state = charState.type;
                    let stateindex = charState.index;
                    let statesentence = charState.sentence;
                    let color =
                      state === 0 ? 'gray' : state === 1 ? 'black' : 'red';

                    return (
                      <Wow id="wow">
                        <h1>
                          <div>
                            {statesentence === idx && stateindex === index ? (
                              <This
                                style={{
                                  textDecoration: 'underline solid',
                                  textUnderlinePosition: 'under',
                                  letterSpacing: '0.2rem',
                                }}
                                className={`caret`}
                                color={color}
                              >
                                {char}
                              </This>
                            ) : statesentence === idx && stateindex > index ? (
                              <This color={'black'}>{char}</This>
                            ) : statesentence > idx ? (
                              <This color={'black'}>{char}</This>
                            ) : (
                              <This color={'gray'}>{char}</This>
                            )}
                          </div>
                        </h1>
                      </Wow>
                    );
                  })}
                </div>
              );
            })}
          </TypingGameBox>
        </Typing>
      )}
    </div>
  );
};

export default TypingGame;
