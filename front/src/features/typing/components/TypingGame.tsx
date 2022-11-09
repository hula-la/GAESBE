import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  /* border: 2px solid red; */
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;
const Personal = styled.div`
  display: flex;
  flex-direction: row;
`;
const PersonalId = styled.div`
  width: 20%;
  height: 5vh;
  border: 2px solid blue;
`;
// const PersonalCharacter = styled.div`
const PersonalCharacter = styled('div')<{ progress: string }>`
  width: 550px;
  height: 5vh;
  border: 2px solid red;
  /* padding-left: 100px; */
  .img {
    padding-left: ${(props) => props.progress};
    height: 150%;
  }
`;
const PersonalResult = styled.div`
  width: 20%;
  height: 5vh;
  border: 2px solid yellow;
`;
const Typing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TypingResult = styled.div`
  width: 90%;
  /* border: 2px solid;
  border-radius: 20px; */
  color: white;
  margin-bottom: 3rem;
`;
const TypingPersonalResult = styled.div`
  border: 2px solid;
  border-radius: 5px;
  color: white;
  height: 6vh;
`;
const TypingGameBox = styled.div`
  width: 89%;
  background-color: white;
  /* margin-left: 1rem; */
  padding-left: 1rem;
  padding-top: 1rem;
  height: 14rem;
  border-radius: 20px;
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
  let playerList: Array<any>;
  const location = useLocation();
  const { lang } = location.state;
  const [players, setPlayers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [roomCode, setRoomCode] = useState<string>('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const [countArr, setCountArr] = useState<any>(null);
  const characterCountArr = [0, 0];

  const socket: CustomWebSocket = new SockJS(
    'https://k7e104.p.ssafy.io:8081/api/ws',
  );
  // const example = [
  //   "wordsˇ=ˇ['cat',ˇ'window',ˇ'defenestrate']",
  //   'forˇwˇinˇwords:',
  //   'print(w,ˇlen(w))',
  // ];
  const example = ['forˇiˇinˇrange(1,ˇ10):', 'ˇˇˇˇprint(i)'];

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

  const client = Stomp.over(socket);
  const client2 = Stomp.over(socket);
  useEffect(() => {
    if (userInfo) {
      client.connect({}, (frame) => {
        console.log('*****************121**************************');
        // client.subscribe(`/cs/${userInfo.id}`, (res) => {
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
              console.log('시작했나요???');
              setTimeout(() => {
                setIsLoading(false);
              }, 2000);
            }
          }
          console.log('첫구독', res);
        });
        const enterRoom = () => {
          client.send(
            // '/api/cs',
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
          console.log('이게 테데ㅔㅔㅔㅔㅔㅔ', testdata);
          console.log('이게 테데ㅔㅔㅔㅔㅔㅔ', testdata.length);
          if (testdata.hasOwnProperty('progressByPlayer')) {
            console.log(testdata.progressByPlayer);
            console.log(testdata.progressByPlayer[`${userInfo.id}`]);
            setTest(testdata.progressByPlayer[`${userInfo.id}`]);
            testtest = testdata.progressByPlayer[`${userInfo.id}`];
          } else if (testdata.hasOwnProperty('msg')) {
            if (testdata.msg === 'start') {
              setTimeout(() => {
                setIsLoading(false);
              }, 2000);
            }
          } else {
            if (!playerList) {
              for (let i = 0; i < testdata.length; i++) {
                console.log('들어오나????????????????', testdata[i].id);
                characterCountArr[i] = testdata[i].id;
              }
              setCountArr(characterCountArr);
            } else if (playerList.length > testdata.length) {
              const temp = playerList.filter((player: any) => {
                return !testdata.some(
                  (dataItem: any) => player.id === dataItem.id,
                );
              });
              characterCountArr[characterCountArr.indexOf(temp[0].id)] = 0;
              setCountArr(characterCountArr);
            } else if (playerList.length < testdata.length) {
              const temp = testdata.filter((dataItem: any) => {
                return !playerList.some(
                  (player: any) => dataItem.id === player.id,
                );
              });
              characterCountArr[characterCountArr.indexOf(0)] = temp[0].id;
              setCountArr(characterCountArr);
            }
            setPlayers(testdata);
            playerList = testdata;
          }
        });
      });
      // console.log(
      //   characterCountArr,
      //   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      // );
    }
    console.log('재실행?', progress);
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

  // 게임 로직
  // const handleSetKey = (event: any) => {
  //   if (event.key === 'Backspace') {
  //     event.preventDefault();
  //   } else if (event.key === ' ') {
  //     if (example[sentence][index] === 'ˇ') {
  //       console.log('****************보냄********************');
  //       client.send(
  //         '/api/typing2/submit',
  //         {},
  //         JSON.stringify({
  //           roomCode: roomCode,
  //           sessionId: socket._transport.url.slice(-18, -10),
  //           isCorrect: true,
  //           userId: userInfo.id,
  //         }),
  //       );
  //       setProgress(progress + 1);
  //       setIndex(index + 1);
  //       const changedState = JSON.parse(
  //         JSON.stringify({ index: index, sentence: sentence, type: 1 }),
  //       );
  //       setCharState(changedState);
  //       console.log(index, '맞다');
  //     } else if (example[sentence][index] !== event.key) {
  //       if (charState.type === 1) {
  //         // console.log(index, '처음 틀림');
  //         const changedState = JSON.parse(
  //           JSON.stringify({ index: index, sentence: sentence, type: 2 }),
  //         );
  //         setCharState(changedState);
  //         // 틀린거 또 틀렸다.
  //         // 그럼 이제 안보낸다.
  //         // 왜? 한번 보냈으니까
  //       } else if (charState.type === 2) {
  //         console.log('여러번 틀림');
  //       }
  //       // event.preventDefault();
  //     }
  //   } else if (event.key === 'Enter') {
  //     if (index === example[sentence].length) {
  //       // console.log('지금만 가능');
  //       const changedState = JSON.parse(
  //         JSON.stringify({ index: 0, sentence: sentence + 1, type: 0 }),
  //       );
  //       setCharState(changedState);
  //       setSentence(sentence + 1);
  //       setIndex(0);
  //     } else {
  //       event.preventDefault();
  //       // console.log('불가능');
  //     }
  //     // console.log('엔터눌렀을때 인덱스', index);
  //     // console.log(
  //     //   '엔터눌렀을때 그 줄 마지막인덱스 번호?',
  //     //   example[sentence].length,
  //     // );
  //   } else if (
  //     event.key !== 'Enter' &&
  //     event.key !== 'Shift' &&
  //     event.key !== 'Alt' &&
  //     event.key !== 'Control' &&
  //     event.key !== 'CapsLock' &&
  //     event.key !== 'F12' &&
  //     event.key !== 'F5' &&
  //     event.key !== 'Tab' &&
  //     event.key !== 'Meta' &&
  //     event.key !== 'HanjaMode' &&
  //     event.key !== 'ArrowLeft' &&
  //     event.key !== 'ArrowRight' &&
  //     event.key !== 'ArrowDown' &&
  //     event.key !== 'ArrowUp'
  //   ) {
  //     // 백에 보내는 맞고 틀리고는 무조건 인덱스당 한번만

  //     // 내가 친거랑 쳐야하는게 똑같다면
  //     if (example[sentence][index] === event.key) {
  //       // 마지막줄 마지막 인덱스라면
  //       if (
  //         sentence === example.length - 1 &&
  //         index === example[example.length - 1].length - 1
  //       ) {
  //         setIndex(index + 1);
  //         setProgress(progress + 1);
  //         console.log('****************보냄********************');
  //         client.send(
  //           '/api/typing2/submit',
  //           {},
  //           JSON.stringify({
  //             roomCode: roomCode,
  //             sessionId: socket._transport.url.slice(-18, -10),
  //             isCorrect: true,
  //             userId: userInfo.id,
  //           }),
  //         );
  //         const changedState = JSON.parse(
  //           JSON.stringify({ index: index, sentence: sentence, type: 1 }),
  //         );
  //         setCharState(changedState);
  //         console.log('마지막 도착');
  //         setEndGame(1);
  //         event.preventDefault();

  //         // 막타 아니고 그냥 맞은거라면
  //       } else {
  //         console.log(index, '맞다');
  //         console.log('****************보냄********************');
  //         client.send(
  //           '/api/typing2/submit',
  //           {},
  //           JSON.stringify({
  //             roomCode: roomCode,
  //             sessionId: socket._transport.url.slice(-18, -10),
  //             isCorrect: true,
  //             userId: userInfo.id,
  //           }),
  //         );

  //         setProgress(progress + 1);
  //         setIndex(index + 1);
  //         const changedState = JSON.parse(
  //           JSON.stringify({ index: index, sentence: sentence, type: 1 }),
  //         );
  //         setCharState(changedState);
  //       }
  //       // 틀렸다면
  //     } else {
  //       // 틀렸는데 마지막이라면?
  //       if (
  //         sentence === example.length - 1 &&
  //         index === example[example.length - 1].length
  //       ) {
  //         event.preventDefault();
  //         console.log('끝났다며');
  //         // 마지막이 아니라 그냥 틀린거면
  //       } else {
  //         // 전에꺼가 맞았다면 -> 이번꺼는 아직 쳤었다
  //         // 틀렸으면 보내야한다
  //         if (charState.type === 1) {
  //           console.log(index, '처음 틀림');
  //           const changedState = JSON.parse(
  //             JSON.stringify({ index: index, sentence: sentence, type: 2 }),
  //           );
  //           setCharState(changedState);
  //           // 틀린거 또 틀렸다.
  //           // 그럼 이제 안보낸다.
  //           // 왜? 한번 보냈으니까
  //         } else if (charState.type === 2) {
  //           console.log('여러번 틀림');
  //         }
  //       }
  //     }
  //     // console.log(index);
  //   } else {
  //     // console.log("1");
  //   }
  // };
  const handleSetKey = (event: any) => {
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
        console.log(index, '맞다');
      } else {
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 2 }),
        );
        setCharState(changedState);
      }
    } else if (event.key === 'Enter') {
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
        console.log(index, '맞다');
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
      {isLoading && (
        <LoadingBlock>
          <img src="/img/loadingspinner.gif" />
          <p className="loadingText">랜덤 매칭중~</p>
        </LoadingBlock>
      )}
      {!isLoading && (
        <Typing>
          {/* <TypingResult>
          <TypingPersonalResult>
          <Personal>
          <PersonalId>
          {players &&
            players.map((player: any, idx: any) => {
              return <li key={idx}>{player.nickname}</li>;
            })}
            </PersonalId>
            <PersonalCharacter
            progress={`${(progress / totalLength) * 30}vw`}
            >
                <img
                  className="img"
                  src="https://chukkachukka.s3.ap-northeast-2.amazonaws.com/profile/2_walk.gif"
                  alt=""
                  />
                  </PersonalCharacter>
                  <PersonalResult>
                  {test}
                  </PersonalResult>
                  </Personal>
                  </TypingPersonalResult>
                  <TypingPersonalResult></TypingPersonalResult>
                  <TypingPersonalResult>
                  여기는 실시간으로 사람3의 정보가 뜬다.
                  </TypingPersonalResult>
                  <TypingPersonalResult>
                  여기는 실시간으로 사람4의 정보가 뜬다.
                  </TypingPersonalResult>
                </TypingResult> */}
          {/* {players && players.filter()} */}

          <TypingResult>
            {players &&
              players.map((player: any, idx: number) => {
                console.log('에게ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ', player);
                console.log('에게ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ', countArr);
                console.log('에게ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ', characterCountArr);
                return (
                  <TypingPersonalResult>
                    <Personal key={idx}>
                      <PersonalId>{player.nickname}</PersonalId>
                      <PersonalCharacter
                        progress={`${test}vw`}
                        // progress={`${(progress / totalLength) * 30}vw`}
                      >
                        <img
                          className="img"
                          src={`/img/rank/character${player.profileChar}.png`}
                          alt="asdf"
                        />
                      </PersonalCharacter>
                      <PersonalResult>{testtest}</PersonalResult>
                    </Personal>
                  </TypingPersonalResult>
                );
              })}
          </TypingResult>
          <TypingGameBox
            onKeyDown={(event) => handleSetKey(event)}
            tabIndex={1}
          >
            {item.map((e, idx) => {
              // console.log("뭐가 e", e, idx);
              return (
                <div>
                  {e.split('').map((char: string, index: number) => {
                    let state = charState.type;
                    let stateindex = charState.index;
                    let statesentence = charState.sentence;
                    let color =
                      state === 0 ? 'gray' : state === 1 ? 'black' : 'red';

                    return (
                      <Wow>
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
      {/* <div style={{ color: 'white' }}>
      {endGame === 1 ? <div>끝</div> : null}
      </div> */}
    </div>
  );
};

export default TypingGame;
