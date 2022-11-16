import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import './style.css';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import FriendModal from '../../friend/components/FriendModal';
import { friendActions } from '../../friend/friendSlice';
import { usePrompt } from '../../../utils/block';
interface CustomWebSocket extends WebSocket {
  _transport?: any;
}

interface CharStateType {
  index: number;
  sentence: number;
  type: number;
}

const TypingBg = styled.img`
  height: 100%;
  position: absolute;

  width: 100%;

  text-align: left;
`;
const TrackLine = styled.div`
  height: 25%;
`;
const Track = styled.div`
  height: calc(20vh - 1rem);
  margin-top: 21.5vh;
`;

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
  width: 100%;
  color: white;
  height: 100%;
  margin-bottom: 1px;
`;
const Personal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const PersonalId = styled.div`
  width: 3%;
  height: 100%;
`;
const PersonalCharacter = styled.div`
  width: 87%;
  position: relative;
  &::after {
    content: '';
    border-right: 1rem solid #bf0909;
    position: absolute;
    right: 0;
    height: 100%;
    box-shadow: 1px 1px 2px 1px #bf0909;
  }
  .imgNormal {
    transform: scaleX(-1);
  }
`;
const CharacterImg = styled('img')<{ progress: string }>`
  padding-left: ${(props) => props.progress};
  // 부드럽게 움직이도록
  transition: all 0.4s;
  height: 200%;
  bottom: 20%;
  position: absolute;
  z-index: 1;
`;
const PersonalResult = styled.div`
  width: 10%;
  border-radius: 5px;
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
  width: 100%;
  color: white;
  margin-bottom: 3rem;
  box-sizing: border-box;
  min-height: 50vh;
  max-height: 50vh;
  position: relative;
  display: inline-block;
  *display: inline;
  zoom: 1;
  border: 1rem solid #232323;
  box-sizing: border-box;
  border-radius: 2rem;
  overflow: hidden;
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
  overflow: hidden;
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
const TypingFriendGame = () => {
  let roomcode: string;
  let testtest: number;
  let testprogress: any;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lang } = location.state;
  const [players, setPlayers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [roomCode, setRoomCode] = useState<string>('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const [testProgress, setTestProgress] = useState<any>(null);
  const [paragraph, setPargraph] = useState<any>(null);
  const [isEnd, setIsEnd] = useState<Boolean>(false);
  const [resultId, setResultId] = useState<any>(null);
  const [resultNickName, setResultNickName] = useState<any>(null);
  const [resultProfile, setResultProfile] = useState<any>(null);
  const initialTime = useRef<number>(3);
  const interval = useRef<any>(null);
  const [sec, setSec] = useState(3);
  const { modal } = useSelector((state: any) => state.friend);
  const { shareCode } = location.state;
  const { friendId } = useSelector((state: any) => state.friend);
  const [master, setMaster] = useState<Boolean>(false);

  const client = useRef<any>(null);
  useEffect(() => {
    if (isEnd && resultId && resultNickName) {
      console.log('끄읕');
      navigate('/game/typing/result', {
        state: {
          resultId: resultId,
          resultNickName: resultNickName,
          resultProfile: resultProfile,
        },
      });
    }
  }, [isEnd, resultId, resultNickName]);
  useEffect(() => {
    return () => setIsLoading(true);
  }, []);
  // 뒤로가기 막는 useEffect
  // useEffect(() => {
  //   const preventGoBack = () => {
  //     // change start
  //     window.history.pushState(null, '', window.location.href);
  //     // change end
  //     alert('게임중에는 나갈 수 없습니다');
  //   };
  //   window.history.pushState(null, '', window.location.href);
  //   window.addEventListener('popstate', preventGoBack);
  //   return () => window.removeEventListener('popstate', preventGoBack);
  // }, []);
  // // 뒤로가기 막는 useEffect
  // // 새로고침, 창닫기, 사이드바 클릭 등으로 페이지 벗어날때 confirm 띄우기
  // usePrompt('게임중에 나가면 등수가 기록되지 않습니다', true);
  useEffect(() => {
    if (userInfo) {
      const socket: CustomWebSocket = new SockJS(
        'https://k7e104.p.ssafy.io:8081/api/ws',
      );
      client.current = Stomp.over(socket);
      client.current.connect({}, (frame: any) => {
        console.log(client.current, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        // client.current.connect({}, (frame: any) => {
        console.log('*****************121**************************');
        client.current.subscribe(`/typing2/${userInfo.id}`, (res: any) => {
          // client.current.subscribe(`/typing2/${userInfo.id}`, (res: any) => {
          var data = JSON.parse(res.body);
          if (data.hasOwnProperty('room')) {
            setRoomCode(data.room);
            roomcode = data.room;
          }
          if (data.hasOwnProperty('isLast')) {
            if (data.isLast === true) {
              client.current.send(
                // client.current.send(
                '/api/typing2/start',
                {},
                JSON.stringify({
                  langType: lang,
                  roomCode: roomcode,
                }),
              );
              // setIsReady(true);
              setIsLoading(false);
              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 5000);
            }
          }
          if (data.hasOwnProperty('isMaster')) {
            if (data.isMaster === true) {
              setMaster(true);
            }
          }
        });
        const enterRoom = () => {
          client.current.send(
            '/api/typing2',
            {},
            JSON.stringify({
              langType: lang,
              type: 'ENTER',
              sessionId: socket._transport.url.slice(-18, -10),
              userId: userInfo.id,
              roomType: 'FRIEND',
              roomCode: shareCode,
            }),
          );
        };
        enterRoom();
        const fetchMemberInfo = () => {
          client.current.send(
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
    return () => {
      client.current.disconnect(() => {});
    };
  }, []);

  useEffect(() => {
    if (roomCode) {
      const socket: CustomWebSocket = new SockJS(
        'https://k7e104.p.ssafy.io:8081/api/ws',
      );
      const client2 = Stomp.over(socket);
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
              // setIsReady(true);
              setIsLoading(false);
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
        if (client.current.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(client, callback);
        }
      },
      10, // 밀리초 간격으로 실행
    );
  }
  const typinggamebox = useRef<HTMLDivElement>(null);
  function yscroll() {
    typinggamebox.current?.scrollBy({
      left: -10000,
      top: 40,
      behavior: 'smooth',
    });
  }
  function xscroll() {
    typinggamebox.current?.scrollBy({ left: 10, behavior: 'smooth' });
  }
  const exapmleitem = `${paragraph}`;
  const example = exapmleitem.split(' ');
  const item = example.map((e) => e);
  let totalLength = 0;
  const arr = [0, 1, 2, 3];
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
        xscroll();
        waitForConnection(client, function () {
          client.current.send(
            '/api/typing2/submit',
            {},
            JSON.stringify({
              roomCode: roomCode,
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
      if (index === example[sentence].length) {
        yscroll();
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
        xscroll();
        waitForConnection(client, function () {
          client.current.send(
            '/api/typing2/submit',
            {},
            JSON.stringify({
              roomCode: roomCode,
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
  const handleModal = () => {
    dispatch(friendActions.handleModal('invite'));
  };
  const closeModal = () => {
    dispatch(friendActions.handleModal(null));
  };
  const onClickStart = () => {
    client.current.send(
      '/api/typing2/start',
      {},
      JSON.stringify({
        langType: lang,
        roomCode: roomCode,
      }),
    );
    setIsLoading(false);
  };
  useEffect(() => {
    if (friendId) {
      client.current.send(
        '/api/friend/invite',
        {},
        JSON.stringify({
          userId: friendId,
          gameType: 'typing',
          roomCode: roomCode,
        }),
      );
    }
  }, [friendId]);
  // const invite = () => {};
  return (
    <div>
      {isLoading && !players && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" />
          <p className="loadingText">랜덤 매칭중~</p>
        </LoadingBlock>
      )}

      <Typing>
        {modal === 'invite' && (
          <FriendModal handleModal={closeModal} type="invite" />
        )}
        {players && (
          <TypingResult>
            <TypingBg
              className="typingBg"
              src="/img/typing/typingTrack2.png"
              alt="타이핑 트랙"
            />
            <Track>
              {arr.map((a: any, idx: number) => {
                return (
                  <TrackLine key={idx}>
                    <TypingPersonalResult>
                      <Personal>
                        <PersonalId>
                          {idx < players.length && (
                            <div>{players[idx].nickname}</div>
                          )}
                        </PersonalId>
                        <PersonalCharacter>
                          {/* 로딩되고 있을 땐 가만히 서있는걸로 */}
                          {isLoading && idx < players.length && (
                            <CharacterImg
                              progress={
                                testProgress
                                  ? testProgress.progressByPlayer[
                                      `${players[idx].id}`
                                    ] + '%'
                                  : '0%'
                              }
                              className="imgNormal"
                              src={`${process.env.REACT_APP_S3_URL}/profile/${players[idx].profileChar}_normal.gif`}
                              // src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
                              alt="playerImg"
                            />
                          )}

                          {/* 로딩되고 있을 땐 가만히 서있는걸로 */}
                          {!isLoading && idx < players.length && (
                            <CharacterImg
                              progress={
                                testProgress
                                  ? testProgress.progressByPlayer[
                                      `${players[idx].id}`
                                    ] + '%'
                                  : '0%'
                              }
                              className="img"
                              // src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_walk.gif`}
                              src={`${process.env.REACT_APP_S3_URL}/profile/${players[idx].profileChar}_walk.gif`}
                              alt="playerImg"
                            />
                          )}
                        </PersonalCharacter>
                        <PersonalResult>
                          {idx < players.length && testProgress && (
                            <div>
                              {
                                testProgress.progressByPlayer[
                                  `${players[idx].id}`
                                ]
                              }
                            </div>
                          )}
                        </PersonalResult>
                      </Personal>
                    </TypingPersonalResult>
                  </TrackLine>
                );
              })}
            </Track>
          </TypingResult>
        )}

        {/* 대기하고 있을때 */}
        {isLoading && players && (
          <WaitingTypingGameBox>
            {master && <div>시작하기를 눌러 게임을 시작하세요</div>}
            {!master && <div>방장이 시작하기를 기다리세요</div>}
            {modal === 'invite' && (
              <FriendModal handleModal={closeModal} type="invite" />
            )}
            <div>
              <button onClick={handleModal}>친구 초대</button>
            </div>
            <div>
              {master && <button onClick={onClickStart}>게임시작</button>}
            </div>
          </WaitingTypingGameBox>
        )}

        {/* 게임 시작했을 때 */}

        {!isLoading && (
          <TypingGameBox
            ref={typinggamebox}
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
        )}
      </Typing>
    </div>
  );
};

export default TypingFriendGame;
// import { useEffect, useState, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import './style.css';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
// import FriendModal from '../../friend/components/FriendModal';
// import { friendActions } from '../../friend/friendSlice';
// import { usePrompt } from '../../../utils/block';
// interface CustomWebSocket extends WebSocket {
//   _transport?: any;
// }

// interface CharStateType {
//   index: number;
//   sentence: number;
//   type: number;
// }

// const TypingBg = styled.img`
//   height: 100%;
//   position: absolute;

//   width: 100%;

//   text-align: left;
// `;
// const TrackLine = styled.div`
//   height: 25%;
// `;
// const Track = styled.div`
//   height: calc(20vh - 1rem);
//   margin-top: 21.5vh;
// `;

// const LoadingBlock = styled.div`
//   display: flex;
//   height: 100%;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   .loadingText {
//     font-size: large;
//   }
// `;
// const TypingPersonalResult = styled.div`
//   /* border: 2px solid;
//   border-radius: 5px; */
//   width: 100%;
//   color: white;
//   height: 100%;
//   /* height: 7vh; */
//   margin-bottom: 1px;
// `;
// const Personal = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
// `;
// const PersonalId = styled.div`
//   width: 3%;
//   height: 100%;
//   /* height: 7vh; */
//   /* border: 2px solid blue; */
//   /* border: 2px solid white; */
//   /* display: flex; */
//   /* justify-content: center; */
//   /* align-items: center; */

//   /* padding-top: 0.5rem; */
// `;
// const PersonalCharacter = styled.div`
//   /* background: #deb36d; */

//   width: 87%;
//   /* height: 7vh; */
//   /* border-top: 0.5rem solid white; */
//   /* border-bottom: 0.5rem solid white; */

//   position: relative;

//   &::after {
//     content: '';
//     border-right: 1rem solid #bf0909;
//     position: absolute;
//     right: 0;
//     height: 100%;

//     box-shadow: 1px 1px 2px 1px #bf0909;
//   }

//   .imgNormal {
//     transform: scaleX(-1);
//   }
// `;
// const CharacterImg = styled('img')<{ progress: string }>`
//   padding-left: ${(props) => props.progress};
//   // 부드럽게 움직이도록
//   transition: all 0.4s;
//   height: 200%;
//   bottom: 20%;
//   position: absolute;

//   z-index: 1;
// `;
// const PersonalResult = styled.div`
//   width: 10%;
//   /* height: 7vh; */
//   border-radius: 5px;
//   /* border: 2px solid white; */
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;

//   /* border-left: 2rem solid red; */
// `;
// const Typing = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
// const TypingResult = styled.div`
//   /* padding-top: 20%; */
//   width: 100%;
//   /* max-height: 50vh; */
//   color: white;
//   margin-bottom: 3rem;
//   box-sizing: border-box;

//   min-height: 50vh;
//   max-height: 50vh;

//   position: relative;
//   display: inline-block;
//   *display: inline;
//   zoom: 1;

//   border: 1rem solid #232323;
//   box-sizing: border-box;
//   border-radius: 2rem;
//   overflow: hidden;
// `;
// const WaitingTypingGameBox = styled.div`
//   width: 90%;
//   height: 17rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: black;
//   background-color: white;
//   border-radius: 20px;
// `;
// const TypingGameBox = styled.div`
//   width: 90%;
//   background-color: white;
//   padding-left: 1rem;
//   padding-top: 1rem;
//   height: 17rem;
//   border-radius: 20px;
//   overflow-y: scroll;
//   &::-webkit-scrollbar {
//     width: 15px;
//     border-radius: 70px;
//   }
//   &::-webkit-scrollbar-thumb {
//     border-radius: 50px;
//     background-color: gray;
//   }
// `;

// const Wow = styled.div`
//   display: inline;
//   h1 {
//     display: inline;
//     div {
//       height: 10rem;
//       display: inline;
//     }
//   }
// `;
// const This = styled.div`
//   display: inline;
//   color: ${(props) => props.color};
// `;
// const TypingFriendGame = () => {
//   let roomcode: string;
//   let testtest: number;
//   let testprogress: any;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { lang } = location.state;
//   const [players, setPlayers] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<Boolean>(true);
//   const [roomCode, setRoomCode] = useState<string>('');
//   const { userInfo } = useSelector((state: any) => state.auth);
//   const [testProgress, setTestProgress] = useState<any>(null);
//   const [paragraph, setPargraph] = useState<any>(null);
//   const [isReady, setIsReady] = useState<Boolean>(false);
//   const [isEnd, setIsEnd] = useState<Boolean>(false);
//   const [resultId, setResultId] = useState<any>(null);
//   const [resultNickName, setResultNickName] = useState<any>(null);
//   const [resultProfile, setResultProfile] = useState<any>(null);
//   const initialTime = useRef<number>(3);
//   const interval = useRef<any>(null);
//   const [sec, setSec] = useState(3);
//   const { modal } = useSelector((state: any) => state.friend);
//   const { shareCode } = location.state;
//   const { friendId } = useSelector((state: any) => state.friend);
//   const [master, setMaster] = useState<Boolean>(false);

//   const socket: CustomWebSocket = new SockJS(
//     'https://k7e104.p.ssafy.io:8081/api/ws',
//   );

//   const client = Stomp.over(socket);
//   // const client = useRef<any>(null);
//   const client2 = Stomp.over(socket);
//   // useEffect(() => {
//   //   client.current = Stomp.over(socket);
//   // }, []);

//   useEffect(() => {
//     if (isEnd && resultId && resultNickName && resultProfile) {
//       console.log('끄읕');
//       navigate('/game/typing/result', {
//         state: {
//           resultId: resultId,
//           resultNickName: resultNickName,
//           resultProfile: resultProfile,
//         },
//       });
//     }
//   }, [isEnd, resultId, resultNickName, resultProfile]);
//   useEffect(() => {
//     return () => setIsLoading(true);
//   }, []);
//   // 뒤로가기 막는 useEffect
//   // useEffect(() => {
//   //   const preventGoBack = () => {
//   //     // change start
//   //     window.history.pushState(null, '', window.location.href);
//   //     // change end
//   //     alert('게임중에는 나갈 수 없습니다');
//   //   };
//   //   window.history.pushState(null, '', window.location.href);
//   //   window.addEventListener('popstate', preventGoBack);
//   //   return () => window.removeEventListener('popstate', preventGoBack);
//   // }, []);
//   // // 뒤로가기 막는 useEffect
//   // // 새로고침, 창닫기, 사이드바 클릭 등으로 페이지 벗어날때 confirm 띄우기
//   // usePrompt('게임중에 나가면 등수가 기록되지 않습니다', true);
//   useEffect(() => {
//     if (userInfo) {
//       client.connect({}, (frame) => {
//         // client.current.connect({}, (frame: any) => {
//         console.log('*****************121**************************');
//         client.subscribe(`/typing2/${userInfo.id}`, (res) => {
//           // client.current.subscribe(`/typing2/${userInfo.id}`, (res: any) => {
//           var data = JSON.parse(res.body);
//           if (data.hasOwnProperty('room')) {
//             setRoomCode(data.room);
//             roomcode = data.room;
//           }
//           if (data.hasOwnProperty('isLast')) {
//             if (data.isLast === true) {
//               client.send(
//                 // client.current.send(
//                 '/api/typing2/start',
//                 {},
//                 JSON.stringify({
//                   langType: lang,
//                   roomCode: roomcode,
//                 }),
//               );
//               setIsReady(true);
//               setIsLoading(false);
//               // setTimeout(() => {
//               //   setIsLoading(false);
//               // }, 5000);
//             }
//           }
//           if (data.hasOwnProperty('isMaster')) {
//             if (data.isMaster === true) {
//               setMaster(true);
//             }
//           }
//         });
//         const enterRoom = () => {
//           client.send(
//             // client.current.send(
//             '/api/typing2',
//             {},
//             JSON.stringify({
//               langType: lang,
//               type: 'ENTER',
//               sessionId: socket._transport.url.slice(-18, -10),
//               userId: userInfo.id,
//               roomType: 'FRIEND',
//               roomCode: shareCode,
//             }),
//           );
//         };
//         enterRoom();
//         const fetchMemberInfo = () => {
//           client.send(
//             // client.current.send(
//             '/api/typing2/memberInfo',
//             {},
//             JSON.stringify({
//               roomCode: roomcode,
//             }),
//           );
//         };
//         setTimeout(() => {
//           fetchMemberInfo();
//         }, 2000);
//       });
//     }
//   }, [userInfo]);

//   useEffect(() => {
//     return () => {
//       client.disconnect(() => {});
//       // client.current.disconnect(() => {});
//     };
//   }, []);

//   useEffect(() => {
//     if (roomCode) {
//       client2.connect({}, (frame) => {
//         console.log('*****************177**************************');
//         client2.subscribe('/typing2/room/' + roomCode, (res) => {
//           var testdata = JSON.parse(res.body);
//           if (testdata.hasOwnProperty('progressByPlayer')) {
//             setTest(testdata.progressByPlayer[`${userInfo.id}`]);
//             setTestProgress(testdata);
//             testprogress = testdata.progressByPlayer;
//             testtest = testdata.progressByPlayer[`${userInfo.id}`];
//           } else if (testdata.hasOwnProperty('msg')) {
//             if (testdata.msg === 'start') {
//               setIsReady(true);
//               setIsLoading(false);
//               // setTimeout(() => {
//               //   setIsLoading(false);
//               // }, 5000);
//             } else if (testdata.msg === 'end') {
//               setResultId(testdata.winUserId);
//               setResultNickName(testdata.winUserNickName);
//               setResultProfile(testdata.winUserProfile);
//               setIsEnd(true);
//             }
//           } else if (testdata.hasOwnProperty('paragraph')) {
//             setPargraph(testdata.paragraph);
//           } else if (testdata.hasOwnProperty('roomDto')) {
//             return;
//           } else {
//             setPlayers(testdata);
//           }
//         });
//       });
//     }
//   }, [roomCode]);
//   console.log(isEnd);
//   console.log(resultId);
//   console.log(resultNickName);
//   console.log(resultProfile);
//   function waitForConnection(client: any, callback: any) {
//     setTimeout(
//       function () {
//         // 연결되었을 때 콜백함수 실행
//         if (client.ws.readyState === 1) {
//           callback();
//           // 연결이 안 되었으면 재호출
//         } else {
//           waitForConnection(client, callback);
//         }
//       },
//       1, // 밀리초 간격으로 실행
//     );
//   }

//   const exapmleitem = `${paragraph}`;
//   const example = exapmleitem.split(' ');
//   const item = example.map((e) => e);
//   let totalLength = 0;
//   const arr = [0, 1, 2, 3];
//   item.map((e) => (totalLength += e.length));
//   const [charState, setCharState] = useState<CharStateType>({
//     index: 0,
//     sentence: 0,
//     type: 0,
//   });
//   const [progress, setProgress] = useState<number>(0);
//   const [index, setIndex] = useState<number>(0);
//   const [sentence, setSentence] = useState<number>(0);
//   const [endGame, setEndGame] = useState<number>(0);
//   const [test, setTest] = useState<number>(0);

//   const handleSetKey = (event: any) => {
//     if (event.keyCode === 32) {
//       event.preventDefault();
//       //기능구현
//     }
//     if (event.key === 'Backspace') {
//       event.preventDefault();
//     } else if (event.key === ' ') {
//       if (example[sentence][index] === 'ˇ') {
//         console.log('****************보냄********************');

//         // client.send(
//         // // client.current.send(
//         //   '/api/typing2/submit',
//         //   {},
//         //   JSON.stringify({
//         //     roomCode: roomCode,
//         //     sessionId: socket._transport.url.slice(-18, -10),
//         //     isCorrect: true,
//         //     userId: userInfo.id,
//         //   }),
//         // );

//         waitForConnection(client, function () {
//           client.send(
//             // client.current.send(
//             '/api/typing2/submit',
//             {},
//             JSON.stringify({
//               roomCode: roomCode,
//               sessionId: socket._transport.url.slice(-18, -10),
//               isCorrect: true,
//               userId: userInfo.id,
//             }),
//           );
//         });
//         setProgress(progress + 1);
//         setIndex(index + 1);
//         const changedState = JSON.parse(
//           JSON.stringify({ index: index, sentence: sentence, type: 1 }),
//         );
//         setCharState(changedState);
//       } else {
//         const changedState = JSON.parse(
//           JSON.stringify({ index: index, sentence: sentence, type: 2 }),
//         );
//         setCharState(changedState);
//       }
//     } else if (event.key === 'Enter') {
//       // window.scrollBy(0, 1000);
//       if (index === example[sentence].length) {
//         const changedState = JSON.parse(
//           JSON.stringify({ index: 0, sentence: sentence + 1, type: 0 }),
//         );
//         setCharState(changedState);
//         setSentence(sentence + 1);
//         setIndex(0);
//       } else {
//         event.preventDefault();
//       }
//     } else if (
//       event.key !== 'Enter' &&
//       event.key !== 'Shift' &&
//       event.key !== 'Alt' &&
//       event.key !== 'Control' &&
//       event.key !== 'CapsLock' &&
//       event.key !== 'F12' &&
//       event.key !== 'F5' &&
//       event.key !== 'Tab' &&
//       event.key !== 'Meta' &&
//       event.key !== 'HanjaMode' &&
//       event.key !== 'ArrowLeft' &&
//       event.key !== 'ArrowRight' &&
//       event.key !== 'ArrowDown' &&
//       event.key !== 'ArrowUp'
//     ) {
//       // 백에 보내는 맞고 틀리고는 무조건 인덱스당 한번만

//       // 내가 친거랑 쳐야하는게 똑같다면
//       if (example[sentence][index] === event.key) {
//         console.log('****************보냄********************');
//         waitForConnection(client, function () {
//           client.send(
//             // client.current.send(
//             '/api/typing2/submit',
//             {},
//             JSON.stringify({
//               roomCode: roomCode,
//               // sessionId: socket._transport.url.slice(-18, -10),
//               isCorrect: true,
//               userId: userInfo.id,
//             }),
//           );
//         });

//         setProgress(progress + 1);
//         setIndex(index + 1);
//         const changedState = JSON.parse(
//           JSON.stringify({ index: index, sentence: sentence, type: 1 }),
//         );
//         setCharState(changedState);

//         // 틀렸다면
//       } else {
//         const changedState = JSON.parse(
//           JSON.stringify({ index: index, sentence: sentence, type: 2 }),
//         );
//         setCharState(changedState);
//       }
//     } else {
//     }
//   };
//   const handleModal = () => {
//     dispatch(friendActions.handleModal('invite'));
//   };
//   const closeModal = () => {
//     dispatch(friendActions.handleModal(null));
//   };
//   const onClickStart = () => {
//     client.send(
//       // client.current.send(
//       '/api/typing2/start',
//       {},
//       JSON.stringify({
//         langType: lang,
//         roomCode: roomCode,
//       }),
//     );
//     setIsLoading(false);
//   };
//   useEffect(() => {
//     if (friendId) {
//       waitForConnection(client, function () {
//         client.send(
//           // client.current.send(
//           '/api/friend/invite',
//           {},
//           JSON.stringify({
//             userId: friendId,
//             gameType: 'typing',
//             roomCode: roomCode,
//           }),
//         );
//       });
//     }
//   }, [friendId]);
//   // const invite = () => {};
//   return (
//     <div>
//       {isLoading && !players && (
//         <LoadingBlock>
//           <img src="/img/loadingspinner.gif" />
//           <p className="loadingText">랜덤 매칭중~</p>
//         </LoadingBlock>
//       )}

//       <Typing>
//         {modal === 'invite' && (
//           <FriendModal handleModal={closeModal} type="invite" />
//         )}
//         {players && (
//           <TypingResult>
//             <TypingBg
//               className="typingBg"
//               src="/img/typing/typingTrack2.png"
//               alt="타이핑 트랙"
//             />
//             <Track>
//               {arr.map((a: any, idx: number) => {
//                 return (
//                   <TrackLine key={idx}>
//                     <TypingPersonalResult>
//                       <Personal>
//                         <PersonalId>
//                           {idx < players.length && (
//                             <div>{players[idx].nickname}</div>
//                           )}
//                         </PersonalId>
//                         <PersonalCharacter>
//                           {/* 로딩되고 있을 땐 가만히 서있는걸로 */}
//                           {isLoading && idx < players.length && (
//                             <CharacterImg
//                               progress={
//                                 testProgress
//                                   ? testProgress.progressByPlayer[
//                                       `${players[idx].id}`
//                                     ] + '%'
//                                   : '0%'
//                               }
//                               className="imgNormal"
//                               src={`${process.env.REACT_APP_S3_URL}/profile/${players[idx].profileChar}_normal.gif`}
//                               // src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
//                               alt="playerImg"
//                             />
//                           )}

//                           {/* 로딩되고 있을 땐 가만히 서있는걸로 */}
//                           {!isLoading && idx < players.length && (
//                             <CharacterImg
//                               progress={
//                                 testProgress
//                                   ? testProgress.progressByPlayer[
//                                       `${players[idx].id}`
//                                     ] + '%'
//                                   : '0%'
//                               }
//                               className="img"
//                               // src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_walk.gif`}
//                               src={`${process.env.REACT_APP_S3_URL}/profile/${players[idx].profileChar}_walk.gif`}
//                               alt="playerImg"
//                             />
//                           )}
//                         </PersonalCharacter>
//                         <PersonalResult>
//                           {idx < players.length && testProgress && (
//                             <div>
//                               {
//                                 testProgress.progressByPlayer[
//                                   `${players[idx].id}`
//                                 ]
//                               }
//                             </div>
//                           )}
//                         </PersonalResult>
//                       </Personal>
//                     </TypingPersonalResult>
//                   </TrackLine>
//                 );
//               })}
//             </Track>
//           </TypingResult>
//         )}

//         {/* 대기하고 있을때 */}
//         {isLoading && players && (
//           <WaitingTypingGameBox>
//             {master && <div>시작하기를 눌러 게임을 시작하세요</div>}
//             {!master && <div>방장이 시작하기를 기다리세요</div>}
//             {modal === 'invite' && (
//               <FriendModal handleModal={closeModal} type="invite" />
//             )}
//             <div>
//               <button onClick={handleModal}>친구 초대</button>
//             </div>
//             <div>
//               {master && <button onClick={onClickStart}>게임시작</button>}
//             </div>
//           </WaitingTypingGameBox>
//         )}

//         {/* 게임 시작했을 때 */}

//         {!isLoading && (
//           <TypingGameBox
//             onKeyDown={(event) => handleSetKey(event)}
//             tabIndex={1}
//           >
//             {item.map((e, idx) => {
//               return (
//                 <div>
//                   {e.split('').map((char: string, index: number) => {
//                     let state = charState.type;
//                     let stateindex = charState.index;
//                     let statesentence = charState.sentence;
//                     let color =
//                       state === 0 ? 'gray' : state === 1 ? 'black' : 'red';

//                     return (
//                       <Wow id="wow">
//                         <h1>
//                           <div>
//                             {statesentence === idx && stateindex === index ? (
//                               <This
//                                 style={{
//                                   textDecoration: 'underline solid',
//                                   textUnderlinePosition: 'under',
//                                   letterSpacing: '0.2rem',
//                                 }}
//                                 className={`caret`}
//                                 color={color}
//                               >
//                                 {char}
//                               </This>
//                             ) : statesentence === idx && stateindex > index ? (
//                               <This color={'black'}>{char}</This>
//                             ) : statesentence > idx ? (
//                               <This color={'black'}>{char}</This>
//                             ) : (
//                               <This color={'gray'}>{char}</This>
//                             )}
//                           </div>
//                         </h1>
//                       </Wow>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </TypingGameBox>
//         )}
//       </Typing>
//     </div>
//   );
// };

// export default TypingFriendGame;
