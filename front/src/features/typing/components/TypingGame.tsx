import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './style.css';

interface CharStateType {
  index: number;
  sentence: number;
  type: number;
}
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
  const example = ['forˇiˇinˇrange(1,10):', 'ˇˇˇˇprint(i)'];

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
  // let percent = parseInt(progress / totalLength);
  const handleSetKey = (event: any) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
    } else if (event.key === ' ') {
      if (example[sentence][index] === 'ˇ') {
        setProgress(progress + 1);
        setIndex(index + 1);
        const changedState = JSON.parse(
          JSON.stringify({ index: index, sentence: sentence, type: 1 }),
        );
        setCharState(changedState);
        console.log(index, '맞다');
      } else if (example[sentence][index] !== event.key) {
        if (charState.type === 1) {
          console.log(index, '처음 틀림');
          const changedState = JSON.parse(
            JSON.stringify({ index: index, sentence: sentence, type: 2 }),
          );
          setCharState(changedState);
          // 틀린거 또 틀렸다.
          // 그럼 이제 안보낸다.
          // 왜? 한번 보냈으니까
        } else if (charState.type === 2) {
          console.log('여러번 틀림');
        }
        // event.preventDefault();
      }
    } else if (event.key === 'Enter') {
      if (index === example[sentence].length) {
        // console.log('지금만 가능');
        const changedState = JSON.parse(
          JSON.stringify({ index: 0, sentence: sentence + 1, type: 0 }),
        );
        setCharState(changedState);
        setSentence(sentence + 1);
        setIndex(0);
      } else {
        event.preventDefault();
        // console.log('불가능');
      }
      // console.log('엔터눌렀을때 인덱스', index);
      // console.log(
      //   '엔터눌렀을때 그 줄 마지막인덱스 번호?',
      //   example[sentence].length,
      // );
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
        // 마지막줄 마지막 인덱스라면
        if (
          sentence === example.length - 1 &&
          index === example[example.length - 1].length - 1
        ) {
          setIndex(index + 1);
          setProgress(progress + 1);
          const changedState = JSON.parse(
            JSON.stringify({ index: index, sentence: sentence, type: 1 }),
          );
          setCharState(changedState);
          console.log('마지막 도착');
          setEndGame(1);
          event.preventDefault();

          // 막타 아니고 그냥 맞은거라면
        } else {
          console.log(index, '맞다');
          setProgress(progress + 1);
          setIndex(index + 1);
          const changedState = JSON.parse(
            JSON.stringify({ index: index, sentence: sentence, type: 1 }),
          );
          setCharState(changedState);
        }
        // 틀렸다면
      } else {
        // 틀렸는데 마지막이라면?
        if (
          sentence === example.length - 1 &&
          index === example[example.length - 1].length
        ) {
          event.preventDefault();
          console.log('끝났다며');
          // 마지막이 아니라 그냥 틀린거면
        } else {
          // 전에꺼가 맞았다면 -> 이번꺼는 아직 쳤었다
          // 틀렸으면 보내야한다
          if (charState.type === 1) {
            console.log(index, '처음 틀림');
            const changedState = JSON.parse(
              JSON.stringify({ index: index, sentence: sentence, type: 2 }),
            );
            setCharState(changedState);
            // 틀린거 또 틀렸다.
            // 그럼 이제 안보낸다.
            // 왜? 한번 보냈으니까
          } else if (charState.type === 2) {
            console.log('여러번 틀림');
          }
        }
      }
      // console.log(index);
    } else {
      // console.log("1");
    }
  };
  // console.log(charState.sentence);
  return (
    <div>
      <Typing>
        <TypingResult>
          <TypingPersonalResult>
            <Personal>
              <PersonalId>유저 아이디</PersonalId>
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
                {((progress / totalLength) * 100).toFixed(2)} %
              </PersonalResult>
            </Personal>
          </TypingPersonalResult>
          <TypingPersonalResult>
            여기는 실시간으로 사람2의 정보가 뜬다.
          </TypingPersonalResult>
          <TypingPersonalResult>
            여기는 실시간으로 사람3의 정보가 뜬다.
          </TypingPersonalResult>
          <TypingPersonalResult>
            여기는 실시간으로 사람4의 정보가 뜬다.
          </TypingPersonalResult>
        </TypingResult>
        <TypingGameBox onKeyDown={(event) => handleSetKey(event)} tabIndex={1}>
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
                              // className={`caret border-l-2 border-black`}
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
      <div style={{ color: 'white' }}>
        {endGame === 1 ? <div>끝</div> : null}
      </div>
    </div>
  );
};

export default TypingGame;
